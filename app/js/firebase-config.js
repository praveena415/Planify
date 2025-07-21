import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCIfSX4PjS3gFR-JBiLSAXVfN-WVgsnc7k",
  authDomain: "travel-itinerary-planner-aa54e.firebaseapp.com",
  projectId: "travel-itinerary-planner-aa54e",
  storageBucket: "travel-itinerary-planner-aa54e.appspot.com", 
  messagingSenderId: "194358155263",
  appId: "1:194358155263:web:17bb6f29da70f3dcf339ca",
  measurementId: "G-BBNET4NMFV"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
