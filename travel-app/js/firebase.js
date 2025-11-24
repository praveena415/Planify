
const firebaseConfig = {
  apiKey: "AIzaSyD35VJ_bdT23bHujp9g8o0TnRjocaY_7Xw",
  authDomain: "planify-b6bce.firebaseapp.com",
  projectId: "planify-b6bce",
  storageBucket: "planify-b6bce.firebasestorage.app",
  messagingSenderId: "329236742188",
  appId: "1:329236742188:web:1dc01b9364c4e75a9e1189",
  measurementId: "G-RCF1VZHSKC"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

window.auth = auth;
window.db = db;

auth.onAuthStateChanged(user => {
  const authEls = document.querySelectorAll('.auth-only');
  const navLogin = document.getElementById('navLogin');
  const navSignup = document.getElementById('navSignup');
  const navLogout = document.getElementById('navLogout');

  if (user) {
    authEls.forEach(el => el.style.display = 'inline-block');

    if (navLogin) navLogin.style.display = 'none';
    if (navSignup) navSignup.style.display = 'none';
    if (navLogout) navLogout.style.display = 'inline-block';
  } else {
    authEls.forEach(el => el.style.display = 'none');

    if (navLogin) navLogin.style.display = 'inline-block';
    if (navSignup) navSignup.style.display = 'inline-block';
    if (navLogout) navLogout.style.display = 'none';
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("logoutBtn") ||
              document.querySelector('[data-action="logout"]');

  if (btn) {
    btn.addEventListener("click", (e) => logout(e));
  }
});
