# 🌿 VedAahar Frontend

The **VedAahar Frontend** is a React-based web application that provides a user-friendly interface for generating **personalized Ayurvedic meal plans** based on user preferences, body constitution (*Prakriti*), season (*Ritu*), and health goals.

This frontend communicates with a **Spring Boot backend** and a **Python ML service** to deliver intelligent and customized recommendations.

---

## 🚀 Features

* 🔐 **User Authentication**

  * Login / Signup functionality
  * Secure session handling

* 🥗 **Personalized Meal Plan Generation**

  * Input: Prakriti, Ritu, Goal
  * Displays AI-generated meal recommendations

* 🌐 **API Integration**

  * Communicates with backend using Axios

* 🎨 **Modern UI**

  * Responsive design using Bootstrap
  * Utility-based styling with Tailwind CSS

* 🔔 **User Feedback**

  * Toast notifications using React Hot Toast

* 🔀 **Routing**

  * Seamless navigation using React Router

---

## 🛠️ Tech Stack

### 🔹 Core

* React (v19)
* React DOM
* React Scripts (Create React App)

### 🔹 API Handling

* Axios

### 🔹 Routing

* React Router DOM

### 🔹 UI & Styling

* Bootstrap
* React Bootstrap
* Tailwind CSS
* PostCSS + Autoprefixer

### 🔹 UX Enhancements

* React Hot Toast
* React Icons

### 🔹 Testing

* Testing Library (React, Jest DOM, User Event)

---

## ⚙️ Setup & Installation

---

### Install dependencies

```bash id="cl2"
npm install
```

---

### Start development server
```bash id="cl3"
npm start
```

👉 App will run on:

```id="cl4"
http://localhost:3000
```

---

## 🔗 Backend Integration

Make sure backend is running before using frontend.

```id="cl5"
Spring Boot Backend → http://localhost:8080
ML Service → http://localhost:5000
```

---

## 🔄 Application Flow

1. User enters input (Prakriti, Goal, etc.)
2. Frontend sends request using **Axios**
3. Backend processes request
4. Backend calls ML model (if needed)
5. Response is returned to frontend
6. UI updates with meal plan

---



## 📌 Future Improvements

* Add global state management (Redux / Context API)
* Improve UI with Material Design
* Add multilingual support
* Add loading skeletons & better UX

---

## 👨‍💻 Author

**Niraj Doiphode**


Just tell 👍
