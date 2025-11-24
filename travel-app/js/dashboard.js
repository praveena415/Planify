function $(id){ return document.getElementById(id); }
function escapeHtml(s){ if(!s) return ''; return String(s).replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[c]); }

function renderTrips(trips){
  const grid = $('tripList') || $('tripGrid');
  if(!grid) return;
  if (!trips || trips.length === 0){
    grid.innerHTML = `<div class="small">No trips yet — create one!</div>`;
    return;
  }
  grid.innerHTML = '';
  trips.forEach(t => {
    const card = document.createElement('div');
    card.className = 'trip-card';
    const title = escapeHtml(t.title || t.name || 'Untitled');
    const destination = escapeHtml(t.destination || t.location || '');
    const start = escapeHtml(t.startDate || t.start || '');
    const end = escapeHtml(t.endDate || t.end || '');
    card.innerHTML = `
      <h3>${title}</h3>
      <div class="small">${destination}${start ? ' • ' + start + (end ? ' → ' + end : '') : ''}</div>
      <div class="trip-actions" style="margin-top:12px">
        <button class="btn btn-soft" onclick="openTrip('${encodeURIComponent(t.id)}')">Open</button>
        <button class="btn btn-ghost" onclick="deleteTrip('${encodeURIComponent(t.id)}')">Delete</button>
        <button class="btn btn-ghost" onclick="makePublic('${encodeURIComponent(t.id)}')">Share</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function openTrip(id){
  if(!id) { alert('Trip id missing'); return; }
  window.location.href = `trip-details.html?id=${id}`;
}

async function deleteTrip(id){
  if(!confirm('Delete trip? This cannot be undone.')) return;
  try{
    await db.collection('trips').doc(decodeURIComponent(id)).delete();
    alert('Deleted');
  }catch(e){
    alert('Delete failed: ' + (e && e.message ? e.message : e));
  }
}

async function makePublic(id){
  try{
    await db.collection('trips').doc(decodeURIComponent(id)).update({ public: true });
    alert('Trip is now public (shared).');
  }catch(e){
    alert('Share failed: ' + (e && e.message ? e.message : e));
  }
}

auth.onAuthStateChanged(user => {
  if (!user) {
    const grid = $('tripList') || $('tripGrid');
    if (grid) grid.innerHTML = '<div class="small">Please login to see your trips.</div>';
    return;
  }
  const uid = user.uid;
  const indexedQuery = db.collection('trips').where('owner','==',uid).orderBy('createdAt','desc');

  function doRender(tripsArray){
    if (typeof renderTrips === 'function') { renderTrips(tripsArray); return; }
    const grid = $('tripList') || $('tripGrid'); if(!grid) return;
    grid.innerHTML = '';
    tripsArray.forEach(t => {
      const card = document.createElement('div'); card.className = 'trip-card';
      card.innerHTML = `<h3>${t.title||'Untitled'}</h3>
        <div class="small">${t.destination||''}${t.startDate ? ' • ' + t.startDate : ''}</div>
        <div style="margin-top:12px"><a class="btn btn-soft" href="trip-details.html?id=${t.id}">Open</a></div>`;
      grid.appendChild(card);
    });
  }

  let unsub = null;
  try {
    unsub = indexedQuery.onSnapshot(snapshot => {
      const trips = [];
      snapshot.forEach(doc => trips.push({ id: doc.id, ...doc.data() }));
      doRender(trips);
    }, err => {
      if (typeof unsub === 'function') unsub();
      fallbackFetchAndRender(uid, doRender);
    });
  } catch (err) {
    if (typeof unsub === 'function') unsub();
    fallbackFetchAndRender(uid, doRender);
  }

  function fallbackFetchAndRender(uid, renderFn) {
    db.collection('trips').where('owner','==',uid).onSnapshot(snapshot => {
      const trips = [];
      snapshot.forEach(doc => trips.push({ id: doc.id, ...doc.data() }));
      trips.sort((a,b) => {
        const at = a.createdAt && a.createdAt.toMillis ? a.createdAt.toMillis() : (a.createdAt ? new Date(a.createdAt).getTime() : 0);
        const bt = b.createdAt && b.createdAt.toMillis ? b.createdAt.toMillis() : (b.createdAt ? new Date(b.createdAt).getTime() : 0);
        return bt - at;
      });
      renderFn(trips);
    }, err => {
      const grid = $('tripList') || $('tripGrid');
      if(grid) grid.innerHTML = `<div style="color:crimson">Unable to load trips: ${err.message}</div>`;
    });
  }
});
