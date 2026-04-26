# 🤖 VedAahar ML Service

The **VedAahar ML Service** is a Python-based backend module responsible for generating **personalized Ayurvedic meal recommendations** using Machine Learning and dataset-driven logic.

It processes user inputs such as **Prakriti (body type), Ritu (season), Goal, and Meal Type**, and returns the most relevant meal suggestions.

---

## 🚀 Features

* 🧠 **Machine Learning Model**

  * Pre-trained model (`vedaahar_model.pkl`)
  * Predicts suitable meals based on user input

* 📊 **Dataset-Based Recommendation**

  * Separate datasets:

    * Veg meals
    * Non-Veg meals
    * Fasting meals

* ⚖️ **Hybrid Logic**

  * ML prediction + rule-based filtering
  * Handles dietary and ritual constraints

* 🌐 **API Ready**

  * Python scripts can be used with Flask API
  * Easily integratable with backend

---

## 🛠️ Tech Stack

* Python
* Pandas
* NumPy
* Scikit-learn
* Flask 

---

## 📂 Project Structure

```id="mlreal"
Vedaahar ML/
├── main.py                # Main execution / API logic
├── Train_Model.py        # Model training script
├── requirements.txt      # Dependencies
│
├── Model/
│   └── vedaahar_model.pkl
│
├── Data/
│   ├── Veg_dataset.csv
│   ├── NonVeg_dataset.csv
│   ├── Fasting_dataset.csv
│   ├── meal_history.csv
│   └── fast_meal_history.csv
```

---

## ⚙️ Setup & Installation

### 1️⃣ Navigate to project folder

```bash
cd Vedaahar ML
```

---

### 2️⃣ Create virtual environment (recommended)

```bash
python -m venv venv
```

Activate:

* Windows:

```bash
venv\Scripts\activate
```

---

### 3️⃣ Install dependencies

```bash
pip install -r requirements.txt
```

---

### 4️⃣ Run the project

```bash
python main.py
```

---

## 🔗 Input Example

```json
{
    "prakriti": "vata",
    "ritu": "hemant",
    "goal": "Energy",
    "day_type": "veg",
    "days": 3,
    "email":"abc@xyz.com"
}
```

---

## 📤 Output Example

```json
{
    "meal_plan": {
        "Day 1": {
            "breakfast": "v004",
            "dinner": "v146",
            "lunch": "v030"
        },
        "Day 2": {
            "breakfast": "v001",
            "dinner": "v081",
            "lunch": "v057"
        },
        "Day 3": {
            "breakfast": "v002",
            "dinner": "v082",
            "lunch": "v055"
        }
    },
    "status": "success"
}
```

---

## 🧠 Model Details

* Model File: `vedaahar_model.pkl`

* Algorithm: (likely Random Forest / classification model)

* Features Used:

  * Prakriti
  * Ritu
  * Goal
  * Meal Slot

* Approach:

  * Prediction using ML model
  * Filtering using dataset constraints
  * Final meal ranking

---

## 📌 Future Improvements

* Upgrade model (XGBoost / LightGBM)
* Improve dataset quality
* Add user feedback learning
* Optimize recommendation accuracy

---

## 👨‍💻 Author

**Niraj Doiphode**
