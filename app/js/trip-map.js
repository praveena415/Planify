import { auth, db } from './firebase-config.js';
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
  collection, addDoc, getDocs
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// Initialize map
const map = L.map('map').setView([20.5937, 78.9629], 5); 

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Get trip ID from URL
const params = new URLSearchParams(window.location.search);
const tripId = params.get("tripId");

// Wait for Firebase auth
onAuthStateChanged(auth, async user => {
  if (!user || !tripId) {
    window.location.href = "index.html";
    return;
  }

  // Set the back link now (tripId is available here)
  document.getElementById("back-link").href = `trip-details.html?tripId=${tripId}`;

  const locationsRef = collection(db, "users", user.uid, "itineraries", tripId, "locations");

  // Load saved locations from Firestore
  const snap = await getDocs(locationsRef);
  snap.forEach(doc => {
    const { lat, lng, name } = doc.data();
    L.marker([lat, lng]).addTo(map).bindPopup(name || "No name");
  });

  // Add new marker on click
  map.on('click', async e => {
    const name = prompt("Enter location name:");
    if (!name) return;

    const { lat, lng } = e.latlng;
    await addDoc(locationsRef, { lat, lng, name });

    L.marker([lat, lng]).addTo(map).bindPopup(name).openPopup();
  });
});
