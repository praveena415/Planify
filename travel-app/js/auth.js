// js/auth.js

function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert("Account created successfully!");
      window.location.href = "login.html";
    })
    .catch(err => alert(err.message));
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch(err => alert(err.message));
}

function logout(event) {
  if (event && event.preventDefault) event.preventDefault();

  auth.signOut()
    .then(() => {
      console.log("Logged out successfully");
      window.location.href = "index.html";
    })
    .catch(err => {
      console.error("Logout failed:", err);
      alert("Logout failed: " + err.message);
    });
}
