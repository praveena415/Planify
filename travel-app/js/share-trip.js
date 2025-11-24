function shareTrip() {
  let email = document.getElementById("shareEmail").value;
  if(!email) return alert('Please enter an email to share with.');
  // This is a placeholder: implement real sharing (email or firebase invitations) later.
  alert("Trip shared with " + email + " 💌 (placeholder — add actual email/send logic)");
}
