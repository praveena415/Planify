function $(id){ return document.getElementById(id); }

let currentUser = null;
auth.onAuthStateChanged(u => {
  currentUser = u;
  console.log('Auth state changed. currentUser =', u && u.email ? u.email : null);
});

window.addEventListener('DOMContentLoaded', () => {
  const btn = $('createBtn');
  if (btn) btn.addEventListener('click', handleCreateTrip);
});

async function handleCreateTrip() {
  const btn = $('createBtn');
  const status = $('status') || { textContent: '' }; 
  const nameEl = $('tripName');
  const destEl = $('destination');
  const startEl = $('startDate');
  const endEl = $('endDate');

  const name = nameEl ? nameEl.value.trim() : '';
  const destination = destEl ? destEl.value.trim() : '';
  const start = startEl ? startEl.value : '';
  const end = endEl ? endEl.value : '';

  if (!name) { status.style && (status.style.color='crimson'); status.textContent = 'Please enter a trip name.'; return; }
  if (!destination) { status.style && (status.style.color='crimson'); status.textContent = 'Please enter a destination.'; return; }
  if (!start) { status.style && (status.style.color='crimson'); status.textContent = 'Please choose a start date.'; return; }
  if (!end) { status.style && (status.style.color='crimson'); status.textContent = 'Please choose an end date.'; return; }
  if (new Date(end) < new Date(start)) { status.style && (status.style.color='crimson'); status.textContent = 'End date cannot be before start date.'; return; }

  if (!currentUser) {
    status.style && (status.style.color='crimson');
    status.textContent = 'You must be logged in to create a trip. Redirecting to login...';
    setTimeout(()=> window.location.href = 'login.html', 1200);
    return;
  }

  if (btn) { btn.disabled = true; btn.textContent = 'Creating...'; }
  status.style && (status.style.color=''); status.textContent = '';

  try {
    const payload = {
      title: name,
      destination: destination,
      startDate: start,
      endDate: end,
      owner: currentUser.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      packing: [],
      activities: [],
      expenses: [],
      reminders: [],
      documents: [],
      public: false
    };

    const docRef = await db.collection('trips').add(payload);
    status.style && (status.style.color='green');
    status.textContent = 'Trip created successfully — redirecting...';

    setTimeout(()=> {
      window.location.href = `trip-details.html?id=${docRef.id}`;
    }, 700);

  } catch (err) {
    console.error('Error during trip creation:', err);
    status.style && (status.style.color='crimson');
    status.textContent = 'Failed to create trip: ' + (err && err.message ? err.message : err);
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = 'Create Trip'; }
  }
}
