
# 🌍 Planify – Travel Itinerary Planner

A simple and smart web app to help users create, organize, and manage their travel plans.

## ✨ Features

Planify allows users to:

### 🔐 **Authentication**

* User Signup
* User Login
* Logout
* Firebase Authentication support

### 🧳 **Trip Management**

* Create a new trip by entering:

  * Trip Name
  * Destination
  * Start & End Dates
* View all trips created by the logged-in user
* Trips stored securely in Firebase Firestore
* Each trip is private by default (public field available for future sharing)

### 📄 **Trip Details Page**

Each trip includes dedicated sections:

#### 📝 **Activities**

* Add activities with:

  * Activity Name
  * Description
  * Date/Time
* View all added activities formatted cleanly
* Delete individual activities

#### 🎒 **Packing List**

* Add items to your packing checklist
* Mark items as packed
* Delete items
* Completely synced with Firebase Firestore

### 🔗 **Trip Sharing**

* Generate a shareable trip link
* Other users can view a version of the trip

---

## 🏗️ Tech Stack

| Category   | Technology                                           |
| ---------- | ---------------------------------------------------- |
| Frontend   | HTML, CSS, JavaScript                                |
| Backend    | Firebase Authentication, Firestore, Firebase Storage |
| Deployment | Any static hosting - Netlify   |

---

## 📁 Project Structure

travel-app/
│── index.html
│── login.html
│── signup.html
│── dashboard.html
│── create-trip.html
│── trip-details.html
│── share-trip.html
│
├── js/
│   ├── firebase.js
│   ├── auth.js
│   ├── dashboard.js
│   ├── create-trip.js
│   ├── trip-details.js
│   └── share-trip.js
│
├── css/
│   └── styles.css
│
├── assets/
│   ├── bg-shape1.jpeg
│   ├── bg-shape2.jpeg
│   |── bg-shape3.jpeg
|   ├── icon-bag.jpeg
|   ├── icon-calendar.jpeg
|   ├── icon-map.jpeg
|   └── icon-plane.jpeg
│
└── README.md

---

## 🔧 Firebase Setup

### 1️⃣ Create a Firebase Project

Visit: [https://console.firebase.google.com](https://console.firebase.google.com)

### 2️⃣ Enable These Services

✔ Authentication (Email/Password)
✔ Firestore Database
✔ Firebase Storage

### 3️⃣ Add Your Web App

Copy your Firebase config into `firebase.js`.

### 4️⃣ Firestore Rules

For secure user-based access:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    match /trips/{tripId} {
      allow read, write: if request.auth != null
        && request.auth.uid == resource.data.owner;
      allow create: if request.auth != null 
        && request.resource.data.owner == request.auth.uid;
    }

      match /trips/{tripId}/{collection}/{docId} {
      allow read, write: if request.auth != null 
        && request.auth.uid == get(/databases/$(database)/documents/trips/$(tripId)).data.owner;
    }
  }
}

### 5️⃣ Storage Rules

rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    match /tripDocuments/{tripId}/{fileName} {
      allow read, write: if request.auth != null 
        && request.auth.uid == resource.metadata.owner;
      allow create: if request.auth != null 
        && request.resource.metadata.owner == request.auth.uid;
    }
  }
}

---

## 🚀 How to Run

### ✔ Option A — Open Locally

Just double-click `index.html`
(If some features fail, use Live Server in VS Code)

### ✔ Option B — Deploy with Firebase Hosting

firebase init
firebase deploy

---

## 💡 Future Enhancements (Optional)

* Public trip browsing
* AI-based activity suggestions
* Expense tracker
* Collaborative planning with friends

---

## 📜 License

This project is open for personal or academic use.
© 2025 **Planify** – All Rights Reserved.

