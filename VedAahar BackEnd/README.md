

# VedAahar Backend 🍃


VedAahar is an Ayurvedic meal recommendation system that generates personalized meal plans using user data, seasonal context (Ritu), and a machine learning service.

This repository contains the **Spring Boot backend**, responsible for handling user management, quiz processing, meal recommendation logic, and integration with external services like ML and weather APIs.

---

## 🚀 Features

- 👤 User Registration and Login (Email + Password)
- 🔐 Password Reset using OTP (in-memory storage)
- 🧠 Quiz-based User Profiling (Prakriti, Goals)
- 🍽️ AI-powered Meal Plan Generation
- 🥗 Fasting Meal Recommendation
- 🌦️ Weather-based Ritu (season) detection
- 📡 REST APIs for frontend integration

---

## 🛠️ Tech Stack

- Java
- Spring Boot
- Spring Data JPA (Hibernate)
- MySQL
- Maven
- Spring WebClient (used only for ML service communication)

---

## 🏗️ Architecture

The backend follows a layered architecture:

Controller → Service → Repository → Database

### Additional Components

- External ML Service (Python-based)
- WebClient used specifically for communication with ML APIs

---

## 📁 Project Structure

```

src/main/java/com/example/VedAahar/

├── CONTROLLER/
│   ├── UserController.java
│   ├── MealController.java
│   ├── QuizController.java
│   └── WeatherController.java
│
├── Service/
│   ├── UserService.java
│   ├── QuizService.java
│   └── WeatherService.java
│
├── Repository/
│   ├── UserRepo.java
│   ├── MealRepo.java
│   └── QuizRepo.java
│
├── Model/
│   ├── Users.java
│   ├── Meal.java
│   ├── MealRequest.java
│   ├── MealResponse.java
│   ├── MealPlanResponse.java
│   ├── FastingMealResponse.java
│   ├── DayMeal.java
│   ├── Quiz.java
│   └── OtpData.java
│
└── VedAaharApplication.java

````

---

## ⚙️ Setup Instructions

You’re absolutely right — that’s a **critical missing step**.
Without tables, your backend won’t even start properly or will behave unpredictably.

Let’s fix this properly by adding a **Database Setup section** to your README.

---

# 🔧 Add this section **before running Spring Boot**

## 🗄️ Database Setup (MySQL)

Before running the backend, you must **create the database and required tables**.

---

### 1️⃣ Create Database

```sql
CREATE DATABASE vedaahar;
USE vedaahar;
```

---

### 2️⃣ Create Tables

#### 👤 Users Table

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

#### 🧠 Prakriti Quiz Table

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

#### 🍽️ Meals Table

```sql
CREATE TABLE meals (
    meal_id VARCHAR(20) PRIMARY KEY,
    meal_name VARCHAR(150) NOT NULL,
    recipe_url TEXT
);
```


---

## ⚠️ Important Note (VERY IMPORTANT)

* Your ML model returns **meal IDs (like F001, V002, etc.)**
* These IDs **must exist in the meals table**
* Otherwise → backend will return empty or broken responses


---


### 1. Configure Database (MySQL)

Update `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/vedaahar
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

### 2. Start ML Service

The backend depends on an external ML service running at:

```
http://127.0.0.1:5000
```

Endpoints used:

* `/generate-plan`
* `/generate-fasting-meal`

---

### 3. Run Backend

 run the main class:

```
VedAaharApplication.java
```

---

## 🔌 API Endpoints

### 👤 User APIs (`/info`)

| Endpoint         | Method | Description                     |
| ---------------- | ------ | ------------------------------- |
| `/addUser`       | POST   | Register new user               |
| `/validateUser`  | POST   | Login using email & password    |
| `/forgetPass`    | POST   | Generate OTP for password reset |
| `/VerifyOtp`     | POST   | Verify OTP                      |
| `/resetPassword` | POST   | Reset password                  |

---

### 🍽️ Meal APIs (`/api`)

| Endpoint                 | Method | Description                     |
| ------------------------ | ------ | ------------------------------- |
| `/generate-meal`         | POST   | Generate personalized meal plan |
| `/generate-fasting-meal` | POST   | Generate fasting meal plan      |

---

### 🧠 Quiz APIs

* Submit and store user quiz data
* Used for personalization during meal generation

---

### 🌦️ Weather APIs

* Accept latitude and longitude
* Determine Ritu (season)
* Provide context for meal recommendation

---

## 🧠 Core Logic Flow

### Meal Generation

1. Client sends MealRequest
2. Backend:

   * Fetches user data from database
   * Determines Ritu using WeatherService
3. Calls ML service using WebClient
4. ML returns meal IDs
5. Backend fetches meal details from database
6. Returns structured response to client


---

## 🔐 Authentication & OTP Logic

* Login uses **email and password**
* OTP is used **only for password reset**
* OTP stored in:

  ```
  ConcurrentHashMap<String, OtpData>
  ```
* OTP expiry: 5 minutes
* Expired OTPs are automatically removed

---

## 🌦️ Weather Integration

* Uses user location (latitude, longitude)
* Converts to seasonal category (Ritu)
* Passed to ML model for better recommendations

---

## 🧾 Database Entities

* `Users` → Stores user details
* `Meal` → Stores meal data
* `Quiz` → Stores user preferences

---



## 🔮 Future Improvements

* JWT-based authentication
* Caching mechanisms
* Docker deployment
* Performance optimization

---

