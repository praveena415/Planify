document.addEventListener('DOMContentLoaded', () => {
 
  function createListItem(text, listId) {
    const li = document.createElement('li');
    li.textContent = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = () => li.remove();

    li.appendChild(deleteBtn);
    document.getElementById(listId).appendChild(li);
  }

  // Activities
  document.getElementById('add-activity-btn').addEventListener('click', () => {
    const input = document.getElementById('activity-name');
    if (input.value.trim()) {
      createListItem(input.value.trim(), 'activity-list');
      input.value = '';
    }
  });

  // Flights
  document.getElementById('add-flight-btn').addEventListener('click', () => {
    const input = document.getElementById('flight-info');
    if (input.value.trim()) {
      createListItem(input.value.trim(), 'flight-list');
      input.value = '';
    }
  });

  // Hotels
  document.getElementById('add-hotel-btn').addEventListener('click', () => {
    const input = document.getElementById('hotel-name');
    if (input.value.trim()) {
      createListItem(input.value.trim(), 'hotel-list');
      input.value = '';
    }
  });

  // Expenses
  let totalExpense = 0;
  document.getElementById('add-expense-btn').addEventListener('click', () => {
    const category = document.getElementById('expense-category').value.trim();
    const amount = parseFloat(document.getElementById('expense-amount').value.trim());

    if (category && !isNaN(amount)) {
      const text = `${category}: ₹${amount}`;
      const li = document.createElement('li');
      li.textContent = text;

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.classList.add('delete-btn');
      deleteBtn.onclick = () => {
        li.remove();
        totalExpense -= amount;
        document.getElementById('total-expense').textContent = `Total: ₹${totalExpense}`;
      };

      li.appendChild(deleteBtn);
      document.getElementById('expense-list').appendChild(li);
      totalExpense += amount;

      document.getElementById('total-expense').textContent = `Total: ₹${totalExpense}`;
      document.getElementById('expense-category').value = '';
      document.getElementById('expense-amount').value = '';
    }
  });

  // Packing List
  document.getElementById('add-packing-btn').addEventListener('click', () => {
    const input = document.getElementById('packing-item');
    if (input.value.trim()) {
      createListItem(input.value.trim(), 'packing-list');
      input.value = '';
    }
  });

  // Reminders
  document.getElementById('add-reminder-btn').addEventListener('click', () => {
    const text = document.getElementById('reminder-text').value.trim();
    const time = document.getElementById('reminder-time').value;

    if (text && time) {
      const liText = `${text} @ ${new Date(time).toLocaleString()}`;
      createListItem(liText, 'reminder-list');
      document.getElementById('reminder-text').value = '';
      document.getElementById('reminder-time').value = '';
    }
  });

  // Travel Documents
  document.getElementById('upload-doc-btn').addEventListener('click', () => {
    const fileInput = document.getElementById('doc-file');
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      createListItem(file.name, 'doc-list');
      fileInput.value = '';
    }
  });

  // Reviews
  document.getElementById('submit-review-btn').addEventListener('click', () => {
    const text = document.getElementById('review-text').value.trim();
    if (text) {
      createListItem(text, 'review-list');
      document.getElementById('review-text').value = '';
    }
  });

  // Copy Share Link
  window.copyShareLink = function () {
    const link = document.getElementById('share-link');
    link.value = window.location.href; 
    link.select();
    document.execCommand('copy');
    alert('Link copied to clipboard!');
  };
});
