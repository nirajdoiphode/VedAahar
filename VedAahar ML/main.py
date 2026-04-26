import joblib
import pandas as pd
import numpy as np
import os
from datetime import date
from flask import Flask, request, jsonify
import warnings
import gdown

warnings.filterwarnings("ignore")
app = Flask(__name__)

# ===============================
# PATHS
# ===============================
MODEL_PATH = "Model/vedaahar_model.pkl"
DRIVE_FILE_ID = "10M3eqFw19ISbJZDYDZNCq4CkN61x2eRt"

VEG_PATH = "Data/Veg_dataset.csv"
FASTING_PATH = "Data/Fasting_dataset.csv"
NONVEG_PATH = "Data/NonVeg_dataset.csv"

HISTORY_PATH = "Data/meal_history.csv"          # veg / nonveg
FAST_HISTORY_PATH = "Data/fast_meal_history.csv"  # fasting ONLY

# ===============================
# DOWNLOAD MODEL
# ===============================
def download_model_from_drive(file_id, destination):
    if os.path.exists(destination):
        print("✅ Model already exists, skipping download")
        return

    print("⬇️ Downloading model from Google Drive...")
    os.makedirs(os.path.dirname(destination), exist_ok=True)
    url = f"https://drive.google.com/uc?id={file_id}"
    gdown.download(url, destination, quiet=False)

# ===============================
# LOAD MODEL
# ===============================
download_model_from_drive(DRIVE_FILE_ID, MODEL_PATH)

bundle = joblib.load(MODEL_PATH)
rf = bundle["model"]
model_columns = bundle["columns"]
meal_encoder = bundle["meal_encoder"]

print("✅ Model loaded from pkl")

# ===============================

def encode_input(row_df):
    # One-hot encode
    row_df = pd.get_dummies(row_df)

    # Add missing columns
    for col in model_columns:
        if col not in row_df:
            row_df[col] = 0

    # Ensure same column order
    row_df = row_df[model_columns]

    return row_df
# ===============================
# ===============================


# LOAD DATASETS
# ===============================
veg_df = pd.read_csv(VEG_PATH)
fasting_df = pd.read_csv(FASTING_PATH)
nonveg_df = pd.read_csv(NONVEG_PATH)

def normalize(df):
    for col in ["prakriti", "ritu", "goal", "meal_slot", "meal_id"]:
        if col in df.columns:
            df[col] = df[col].astype(str).str.strip().str.lower()
    return df

veg_df = normalize(veg_df)[["meal_id", "meal_slot"]]
nonveg_df = normalize(nonveg_df)[["meal_id", "meal_slot"]]
fasting_df = normalize(fasting_df)[["meal_id", "meal_slot"]]  # phalaahar / liquid / regular

# ===============================
# EXISTING UTILS (UNCHANGED)
# ===============================
def cleanup_old_history(days_to_keep=2):
    if not os.path.exists(HISTORY_PATH):
        return
    df = pd.read_csv(HISTORY_PATH)
    if df.empty:
        return
    df["date"] = pd.to_datetime(df["date"], errors="coerce")
    cutoff = pd.Timestamp.today().normalize() - pd.Timedelta(days=days_to_keep)
    df[df["date"] >= cutoff].to_csv(HISTORY_PATH, index=False)

def get_top_k_meals(encoded_row, k=30):
    probs = rf.predict_proba(encoded_row)[0]
    ranked = sorted(zip(rf.classes_, probs), key=lambda x: x[1], reverse=True)
    return [meal_encoder.inverse_transform([cls])[0] for cls, _ in ranked[:k]]

def choose_dataset(day_type):
    if day_type == "nonveg":
        return nonveg_df
    return veg_df

def load_history(user):
    if os.path.exists(HISTORY_PATH):
        df = pd.read_csv(HISTORY_PATH)
        return df[df["user"] == user] if not df.empty else df
    return pd.DataFrame(columns=["meal_id"])

def save_history(prakriti, ritu, goal, plan, user):
    today = str(date.today())
    rows = []
    for day, meals in plan.items():
        for slot, meal in meals.items():
            rows.append({
                "date": today,
                "prakriti": prakriti,
                "ritu": ritu,
                "goal": goal,
                "meal_slot": slot,
                "meal_id": meal,
                "user": user
            })
    pd.DataFrame(rows).to_csv(
        HISTORY_PATH,
        mode="a",
        header=not os.path.exists(HISTORY_PATH),
        index=False
    )

# ===============================
# EXISTING MEAL GENERATOR (UNCHANGED)
# ===============================
def generate_meal_plan(prakriti, ritu, goal, day_type, days, user):
    cleanup_old_history()
    used_meals = set(load_history(user)["meal_id"].tolist())
    plan = {}
    active_df = choose_dataset(day_type)

    for d in range(1, days + 1):
        plan[f"Day {d}"] = {}
        for slot in ["breakfast", "lunch", "dinner"]:
            row = pd.DataFrame([{
                "prakriti": prakriti,
                "ritu": ritu,
                "goal": goal,
                "meal_slot": slot
            }])

            # for col in row.columns:
            #     row[col] = label_encoders[col].transform(row[col])
            row = encode_input(row)

            ranked = get_top_k_meals(row)
            valid = active_df[active_df["meal_slot"] == slot]["meal_id"].tolist()
            chosen = next((m for m in ranked if m in valid and m not in used_meals),
                          np.random.choice(valid))
            plan[f"Day {d}"][slot] = chosen
            used_meals.add(chosen)

    return plan

# ===============================
# 🔥 NEW FASTING LOGIC (ISOLATED)
# ===============================
def load_fast_history(user):
    if os.path.exists(FAST_HISTORY_PATH):
        df = pd.read_csv(FAST_HISTORY_PATH)
        return df[df["user"] == user] if not df.empty else df
    return pd.DataFrame(columns=["meal_id"])

def save_fast_history(prakriti, ritu, goal, fasting_type, meal_id, user):
    row = {
        "date": str(date.today()),
        "prakriti": prakriti,
        "ritu": ritu,
        "goal": goal,
        "fasting_type": fasting_type,
        "meal_id": meal_id,
        "user": user
    }
    pd.DataFrame([row]).to_csv(
        FAST_HISTORY_PATH,
        mode="a",
        header=not os.path.exists(FAST_HISTORY_PATH),
        index=False
    )

def recommend_fasting_meals(prakriti, ritu, goal, fasting_type, user, k=3):
    used_meals = set(load_fast_history(user)["meal_id"].tolist())

    row = pd.DataFrame([{
        "prakriti": prakriti,
        "ritu": ritu,
        "goal": goal,
        "meal_slot": fasting_type
    }])

    # for col in row.columns:
    #     row[col] = label_encoders[col].transform(row[col])
    row = encode_input(row)

    ranked = get_top_k_meals(row)

    valid = fasting_df[
        fasting_df["meal_slot"] == fasting_type
    ]["meal_id"].tolist()

    # pick top-k non-repeated fasting-safe meals
    selected = [
        m for m in ranked
        if m in valid and m not in used_meals
    ][:k]

    # fallback (in rare case history blocks everything)
    if len(selected) < k:
        remaining = [m for m in valid if m not in selected]
        selected += list(np.random.choice(
            remaining,
            size=min(k - len(selected), len(remaining)),
            replace=False
        ))

    print(selected)
    return selected


# ===============================
# API (EXISTING – UNCHANGED)
# ===============================
@app.route("/generate-plan", methods=["POST"])
def generate():
    data = request.get_json()

    print(data["prakriti"].lower()+' '+
        data["ritu"].lower()+' '+
        data["goal"].lower()+' '+
        data.get("day_type", "veg").lower()+' '+
        data["email"].lower())

    plan = generate_meal_plan(
        data["prakriti"].lower(),
        data["ritu"].lower(),
        data["goal"].lower(),
        data.get("day_type", "veg").lower(),
        int(data.get("days", 1)),
        data["email"].lower()
    )

    save_history(
        data["prakriti"], data["ritu"], data["goal"],
        plan, data["email"].lower()
    )

    return jsonify({"status": "success", "meal_plan": plan})

# ===============================
# 🔥 NEW FASTING API
# ===============================
@app.route("/generate-fasting-meal", methods=["POST"])
def generate_fasting_meal():
    data = request.get_json()

    print(data["prakriti"].lower() + ' ' +
          data["ritu"].lower() + ' ' +
          data["goal"].lower() + ' ' +
          data["fasting_type"].lower() + ' ' +
          data["email"].lower())

    prakriti = data["prakriti"].lower()
    ritu = data["ritu"].lower()
    goal = data["goal"].lower()
    fasting_type = data["fasting_type"].lower()
    user = data["email"].lower()

    meals = recommend_fasting_meals(
        prakriti, ritu, goal, fasting_type, user
    )

    for meal in meals:
        save_fast_history(
            prakriti, ritu, goal, fasting_type, meal, user
        )

    return jsonify({
        "status": "success",
        "fasting_type": fasting_type,
        "recommended_meals": meals
    })
# ===============================
# RUN
# ===============================
if __name__ == "__main__":
    app.run()
