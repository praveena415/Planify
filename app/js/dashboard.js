import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// Get DOM elements
const emailSpan = document.getElementById("user-email");
const logoutBtn = document.getElementById("logout-btn");
const createTripBtn = document.getElementById("create-trip-btn");
const tripsContainer = document.getElementById("trips-container");

// Show email + get user trips
onAuthStateChanged(auth, async (user) => {
    if (user) {
        emailSpan.textContent = user.email;

        const tripsRef = collection(db, "users", user.uid, "itineraries");
        const snapshot = await getDocs(tripsRef);

        if (snapshot.empty) {
            tripsContainer.innerHTML = "<p>No trips found. Create your first trip!</p>";
        } else {
            snapshot.forEach(doc => {
                const trip = doc.data();
                const tripCard = document.createElement("div");
                tripCard.className = "trip-card";
                tripCard.innerHTML = `
                    <h4>${trip.title}</h4>
                    <p><strong>From:</strong> ${trip.startDate}</p>
                    <p><strong>To:</strong> ${trip.endDate}</p>
                    <button class="view-trip-btn" data-id="${doc.id}">View Details</button>
                    `;

                tripsContainer.appendChild(tripCard);
            });
            document.querySelectorAll(".view-trip-btn").forEach(btn => {
                btn.addEventListener("click", () => {
                    const tripId = btn.getAttribute("data-id");
                    window.location.href = `trip-details.html?tripId=${tripId}`;
                });
            });

        }

    } else {
        window.location.href = "index.html";
    }
});

// Handle logout
logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "index.html";
});

// Go to create-trip.html
createTripBtn.addEventListener("click", () => {
    window.location.href = "create-trip.html";
});
