function shareTrip() {
  let email = document.getElementById("shareEmail").value;
  if(!email) return alert('Please enter an email to share with.');
  alert("Trip shared with " + email + " 💌 (placeholder — add actual email/send logic)");
}
