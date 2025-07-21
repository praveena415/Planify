// js/create-trip.js
import { auth, db } from './firebase-config.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

window.addEventListener('DOMContentLoaded', () => {
  const titleInput = document.getElementById("trip-title");
  const startDateInput = document.getElementById("start-date");
  const endDateInput = document.getElementById("end-date");
  const saveBtn = document.getElementById("save-trip-btn");
  const msg = document.getElementById("msg");

  saveBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;

    if (!title || !startDate || !endDate) {
      msg.textContent = "Please fill in all fields.";
      msg.style.color = "red";
      return;
    }

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const tripRef = collection(db, "users", user.uid, "itineraries");
          await addDoc(tripRef, {
            title,
            startDate,
            endDate,
            createdAt: new Date()
          });
          msg.textContent = "Trip saved successfully!";
          msg.style.color = "green";
          setTimeout(() => {
            window.location.href = "dashboard.html";
          }, 1500);
        } catch (error) {
          console.error("Error adding trip: ", error);
          msg.textContent = "Error saving trip.";
          msg.style.color = "red";
        }
      } else {
        msg.textContent = "User not logged in.";
        msg.style.color = "red";
      }
    });
  });
});
