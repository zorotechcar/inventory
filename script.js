// Retrieve inventory from localStorage or initialize an empty array
let inventory = JSON.parse(localStorage.getItem('inventory')) || [];

// DOM Element for the inventory grid
const inventoryContainer = document.getElementById('inventoryContainer');

// Function to render inventory items as cards
function renderInventory() {
  inventoryContainer.innerHTML = '';

  inventory.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('card');

    // Use the uploaded image or a placeholder if none exists
    const imageSrc = item.image ? item.image : 'https://via.placeholder.com/300x180?text=No+Image';

    card.innerHTML = `
      <img src="${imageSrc}" alt="${item.name}">
      <div class="card-content">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p><strong>Quantity:</strong> ${item.quantity}</p>
        <p><strong>Price:</strong> $${parseFloat(item.price).toFixed(2)}</p>
      </div>
      <div class="card-actions">
        <button class="action-btn edit" data-id="${item.id}">Edit</button>
        <button class="action-btn delete" data-id="${item.id}">Delete</button>
      </div>
    `;
    inventoryContainer.appendChild(card);
  });
}

// Save inventory to localStorage
function saveInventory() {
  localStorage.setItem('inventory', JSON.stringify(inventory));
}

// Handle edit and delete button actions using event delegation
inventoryContainer.addEventListener('click', function(e) {
  const target = e.target;
  const id = target.getAttribute('data-id');

  if (target.classList.contains('edit')) {
    // Navigate to the add/edit page with a query parameter for editing
    window.location.href = `add-item.html?id=${id}`;
  } else if (target.classList.contains('delete')) {
    if (confirm('Are you sure you want to delete this item?')) {
      inventory = inventory.filter(item => item.id !== id);
      saveInventory();
      renderInventory();
    }
  }
});

// Initial render of the inventory
renderInventory();
