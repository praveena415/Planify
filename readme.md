# Travel Itinerary Planner

## Introduction
The **Travel Itinerary Planner** is a full-featured web application designed to help users plan and manage their trips efficiently. It allows users to create itineraries, track expenses, pack items, upload travel documents, get activity recommendations, set reminders, and share trips via a link. Built with Firebase and vanilla JavaScript, this project simplifies travel planning into an interactive and user-friendly experience.

## Project Type
Fullstack

## Deployed App
- **Frontend:** https://your-frontend-site.netlify.app  
- **Backend (Firebase):** https://console.firebase.google.com/project/travel-itinerary-planner-aa54e  
- **Database (Firestore):** https://console.firebase.google.com/project/travel-itinerary-planner-aa54e/firestore

## Directory Structure
travel-itinerary-planner/
|app/
    |-css/
        |-signup.css
        |-index.css
        |-dashboard.css
        |-create-trip.css
        |-trip-details.css
        |-trip-map.css
    |-js/
        |-auth.js
        |-firebase-config.js
        |-dashboard.js
        |-create-trip.js
        |-trip-details.js
        |-trip-map.js   
    |-signup.html
    |-index.html
    |-dashboard.html
    |-create-trip.html
    |-trip-details.html
    |-trip-map.html

## Video Walkthrough of the Project
[Insert your 1-3 min feature demo video link here]

## Video Walkthrough of the Codebase
[Insert your 1-5 min code explanation video link here]

## Features
- User authentication (signup & login)
- Create, view, and share travel itineraries
- Add and manage activities, flights, hotels, and packing lists
- Upload and view travel documents
- Track expenses and calculate total cost
- Set custom reminders for events
- Get smart activity recommendations based on destination
- Submit and view feedback or reviews
- Trip sharing through unique URLs
- Interactive trip map

## Design Decisions or Assumptions
- Firebase Authentication was used for quick and secure login/signup.
- Firestore was selected as the NoSQL database for flexible data modeling.
- Storage uses Firebase Storage for handling uploaded travel documents.
- Static hosting and Firebase rules ensure secure access to user-specific data.
- Each trip is a document under the user’s collection of itineraries.




Credentials
You can use the following demo credentials for testing:

makefile
Copy code
Email: ramu@gmail.com
Password: 123456

API Endpoints (Firestore-based)
ruby
Copy code
/users/:userId/itineraries             → All user trips
/users/:userId/itineraries/:tripId     → Single trip details
/users/:userId/itineraries/:tripId/activities     → Activities collection
/users/:userId/itineraries/:tripId/expenses       → Expenses collection
/users/:userId/itineraries/:tripId/documents      → Uploaded files

Technology Stack
Frontend: HTML, CSS, JavaScript

Backend: Firebase Firestore , Firebase Storage

Authentication: Firebase Auth

Hosting: Localhost / Firebase Hosting

External Services: Google 