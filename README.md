
# 🌿 VedAahar – AI-Powered Ayurvedic Food Recommendation System

VedAahar is a full-stack application that generates **personalized Ayurvedic meal plans** based on a user’s **Prakriti (body type), Ritu (season), and health goals**.

The system integrates:

* 🎨 React Frontend
* ⚙️ Spring Boot Backend
* 🤖 Python ML Service
* 🗄️ MySQL Database

to deliver intelligent, culturally-aware, and health-focused recommendations.

---

## 🚀 Features

* 👤 User Registration & Login (Email + Password)
* 🔐 Password Reset using OTP (in-memory)
* 🧠 Quiz-based Prakriti Analysis
* 🍽️ AI-powered Meal Plan Generation
* 🥗 Veg / Non-Veg / Fasting Meal Support
* 📅 Multi-day Meal Planning (1–3 days)
* 🌦️ Weather-based Ritu detection
* 📄 Recipe View (PDF integration)
* 🎨 Modern, responsive UI

---

## 🏗️ System Architecture

```
Frontend (React)
        ↓
Spring Boot Backend (Java)
        ↓
ML Service (Python - Flask)
        ↓
MySQL Database
```
---
System Screenshots


### 🔹 Homepage
<img width="1346" height="595" alt="Screenshot 2026-04-26 154728" src="https://github.com/user-attachments/assets/04ab4a34-046a-4713-a4b7-38d50be1ce9d" />

---

### 🔹 Login & Registration
<img width="1350" height="593" alt="Screenshot 2026-04-26 161749" src="https://github.com/user-attachments/assets/cdc97d7f-b2b3-4b9f-b060-0579d271bf6f" />  
<br><img width="1344" height="595" alt="image" src="https://github.com/user-attachments/assets/e7c3a5b6-7acf-4982-838a-8ef93d2e4d16" />

---
### 🔹 Quiz
<img width="1339" height="597" alt="image" src="https://github.com/user-attachments/assets/03448a49-6d8e-4867-8af0-4b82d69ccea9" />


---
### 🔹 Meal Generation
<img width="1346" height="596" alt="Screenshot 2026-04-26 161851" src="https://github.com/user-attachments/assets/c8c52a86-55e7-4162-aa18-615e5084bb39" />
<br> <img width="1347" height="571" alt="Screenshot 2026-04-26 161910" src="https://github.com/user-attachments/assets/e5d1c46b-71b0-44cf-9c7f-505ed67a0df8" />
<br> <img width="1348" height="594" alt="Screenshot 2026-04-26 162004" src="https://github.com/user-attachments/assets/b965fc31-03cb-4904-8a3c-eb882fc4d45b" />

---
### 🔹 Recipes
<img width="1353" height="604" alt="Screenshot 2026-04-26 162208" src="https://github.com/user-attachments/assets/1ca1d8af-f984-4a41-a262-ad63a7b6a3d9" />

---



## 🔄 Application Flow

1. User logs in via frontend
2. Selects meal type (Veg / Non-Veg / Fasting)
3. Chooses number of days
4. Frontend sends request → Backend
5. Backend:

   * Fetches user data
   * Determines Ritu (weather-based)
   * Calls ML service using WebClient
6. ML service returns meal IDs
7. Backend maps IDs → meal data from database
8. Response sent to frontend
9. User views meal plan and opens recipe PDFs

---

# 🗄️ Database Setup (MySQL) ⚠️ MUST DO FIRST

## 1. Create Database

```sql
CREATE DATABASE vedaahar;
USE vedaahar;
```

---

## 2. Create Tables

### 👤 Users

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(15),
    health_goal VARCHAR(100),
    prakriti VARCHAR(50)
);
```

---

### 🧠 Prakriti Quiz

```sql
CREATE TABLE prakriti_quiz (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question TEXT NOT NULL,
    option1 VARCHAR(255) NOT NULL,
    option2 VARCHAR(255) NOT NULL,
    option3 VARCHAR(255) NOT NULL
);
```

---

### 🍽️ Meals

```sql
CREATE TABLE meals (
    meal_id VARCHAR(20) PRIMARY KEY,
    meal_name VARCHAR(150) NOT NULL,
    recipe_url TEXT
);
```

---

## ⚠️ Important
* (CHECK RESOURCE FOLDER)
* ML service returns meal IDs like `V001`, `F002`
* These **must exist in the meals table**
* Otherwise → meal plan will fail

---

# ⚙️ Backend (Spring Boot)

## 🛠️ Tech Stack

* Java
* Spring Boot
* Spring Data JPA
* MySQL
* WebClient (ML communication)

---

## ▶️ Run Backend

Configure:

```
spring.datasource.url=jdbc:mysql://localhost:3306/vedaahar
```

Run:

```
VedAaharApplication.java
```

Backend runs on:

```
http://localhost:8080
```

---

# 🤖 ML Service

## 📌 Overview

Generates meal recommendations using:

* Prakriti
* Ritu
* Goal
* Meal Type

---

## 🚀 Features

* Pre-trained model (`vedaahar_model.pkl`)
* Dataset-based filtering
* Hybrid ML + rule-based logic

---

## 🛠️ Tech Stack

* Python
* Pandas
* NumPy
* Scikit-learn
* Flask

---

## ▶️ Run ML Service

```bash
cd PythonProject
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

Runs on:

```
http://127.0.0.1:5000
```

---

## 🔗 Example Input

```json
{
  "prakriti": "vata",
  "ritu": "hemant",
  "goal": "Energy",
  "day_type": "veg",
  "days": 1,
  "email": "abc@xyz.com"
}
```

---

## 📤 Example Output

```json
{
  "meal_plan": {
    "Day 1": {
      "breakfast": "v004",
      "lunch": "v030",
      "dinner": "v146"
    }
  },
  "status": "success"
}
```

---

# 🎨 Frontend (React)

## 🚀 Features

* Login / Signup UI
* Meal selection interface
* Multi-day planner
* Recipe viewing (PDF)
* API integration with backend

---

## 🛠️ Tech Stack

* React
* Axios
* React Router
* Bootstrap
* Tailwind CSS
* React Hot Toast

---

## ▶️ Run Frontend

```bash
npm install
npm start
```

---

# 🔗 Service URLs

| Service  | URL                                            |
| -------- | ---------------------------------------------- |
| Frontend | [http://localhost:3000](http://localhost:3000) |
| Backend  | [http://localhost:8080](http://localhost:8080) |
| ML       | [http://localhost:5000](http://localhost:5000) |

---

## ⚠️ Important Notes

* Start services in this order:

  1. MySQL
  2. ML Service
  3. Backend
  4. Frontend

* Backend will fail if ML service is not running

* Meal generation depends on DB + ML sync

---

## 🔮 Future Improvements

* JWT Authentication
* Mobile App (Android)
* Multilingual support
* Advanced ML models (XGBoost, LightGBM)
* User feedback-based learning

---

## 👨‍💻 Project
VedAahar – Ayurvedic Meal Recommendation System

---

## Author
<b>NIRAJ DOIPHODE
