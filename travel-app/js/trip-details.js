// js/trip-details.js
function $(id){ return document.getElementById(id); }
function escapeHtml(s){ if(!s) return ''; return String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]); }

let currentTripId = null;
let currentTripData = null;
let currentUser = null;

function getParam(name){
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function initPage(){
  const id = getParam('id');
  if(!id){
    $('status').textContent = 'No trip id provided.';
    return false;
  }
  currentTripId = decodeURIComponent(id);
  if(auth.currentUser){
    currentUser = auth.currentUser;
    loadTrip(currentTripId);
  }
  return true;
}

document.addEventListener('DOMContentLoaded', initPage);

auth.onAuthStateChanged(user => {
  currentUser = user;
  if(!currentTripId) {
    initPage();
    return;
  }
  if(currentTripData) return;
  loadTrip(currentTripId);
});

async function loadTrip(id){
  $('status').textContent = 'Loading trip...';
  try {
    const doc = await db.collection('trips').doc(id).get();
    if(!doc.exists){
      $('status').textContent = 'Trip not found.';
      return;
    }
    const data = doc.data();
    currentTripData = data;

    if(!data.public && (!currentUser || currentUser.uid !== data.owner)){
      $('status').textContent = 'You do not have permission to view this trip.';
      return;
    }

    $('tripTitle').textContent = data.title || data.name || 'Untitled';
    $('tripMeta').textContent = `${data.destination || ''} • ${data.startDate || ''}${data.endDate ? ' → ' + data.endDate : ''}`;

    renderActivities(data.activities || []);
    renderPacking(data.packing || []);

    $('status').style.display = 'none';
    $('tripContent').style.display = 'block';
  } catch (err) {
    console.error('Failed to load trip:', err);
    $('status').textContent = 'Failed to load trip: ' + (err && err.message ? err.message : err);
  }
}

function renderActivities(activities){
  const list = $('activityList');
  list.innerHTML = '';
  if(!activities.length){
    list.innerHTML = `<div class="small">No activities yet</div>`;
    return;
  }
  activities.forEach((a, i) => {
    const div = document.createElement('div');
    div.className = 'activity';
    div.innerHTML = `<div>${escapeHtml(a)}</div>
      <div style="margin-top:6px">
        <button class="btn btn-ghost" onclick="removeActivity(${i})">Remove</button>
      </div>`;
    list.appendChild(div);
  });
}

function renderPacking(items){
  const list = $('packingList');
  list.innerHTML = '';
  if(!items.length){
    list.innerHTML = `<div class="small">No packing items yet</div>`;
    return;
  }
  items.forEach((p,i) => {
    const div = document.createElement('div');
    div.className = 'activity';
    div.innerHTML = `<div>${escapeHtml(p)}</div>
      <div style="margin-top:6px">
        <button class="btn btn-ghost" onclick="removePacking(${i})">Remove</button>
      </div>`;
    list.appendChild(div);
  });
}

async function addActivity(){
  const txt = $('activityInput').value.trim();
  if(!txt) return;
  try {
    const newArr = (currentTripData.activities || []).concat(txt);
    await db.collection('trips').doc(currentTripId).update({ activities: newArr });
    $('activityInput').value = '';
    currentTripData.activities = newArr;
    renderActivities(newArr);
  } catch (err) {
    alert('Failed to add activity: ' + (err && err.message ? err.message : err));
  }
}

async function removeActivity(index){
  try {
    const arr = (currentTripData.activities || []).slice();
    arr.splice(index,1);
    await db.collection('trips').doc(currentTripId).update({ activities: arr });
    currentTripData.activities = arr;
    renderActivities(arr);
  } catch (err) {
    alert('Failed to remove activity: ' + (err && err.message ? err.message : err));
  }
}

async function addPacking(){
  const txt = $('packingInput').value.trim();
  if(!txt) return;
  try {
    const newArr = (currentTripData.packing || []).concat(txt);
    await db.collection('trips').doc(currentTripId).update({ packing: newArr });
    $('packingInput').value = '';
    currentTripData.packing = newArr;
    renderPacking(newArr);
  } catch (err) {
    alert('Failed to add packing item: ' + (err && err.message ? err.message : err));
  }
}

async function removePacking(index){
  try {
    const arr = (currentTripData.packing || []).slice();
    arr.splice(index,1);
    await db.collection('trips').doc(currentTripId).update({ packing: arr });
    currentTripData.packing = arr;
    renderPacking(arr);
  } catch (err) {
    alert('Failed to remove packing item: ' + (err && err.message ? err.message : err));
  }
}

function downloadTrip(){
  if(!currentTripId || !currentTripData) return;
  const data = { id: currentTripId, ...currentTripData };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${(currentTripData.title||'trip')}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
