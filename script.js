document.addEventListener('DOMContentLoaded', () => {
    const agendaList = document.getElementById('agenda-list');
    const newTaskInput = document.getElementById('new-task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const currentDateDisplay = document.getElementById('current-date');
    const promosBox = document.getElementById('promos-box');
    const promoContent = document.getElementById('promo-content');
    const closePromoButton = document.getElementById('close-promo');

    // Display the current date
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    currentDateDisplay.textContent = today.toLocaleDateString('en-US', options); // Adjust locale if needed

    // --- Interactive Agenda ---
    agendaList.addEventListener('change', (event) => {
        if (event.target.type === 'checkbox') {
            const taskText = event.target.nextSibling.textContent;
            if (event.target.checked) {
                console.log(`Task "${taskText}" completed.`);
                // In a real app, you might save this state
            } else {
                console.log(`Task "${taskText}" marked as incomplete.`);
            }
        }
    });

    addTaskButton.addEventListener('click', () => {
        const newTaskText = newTaskInput.value.trim();
        if (newTaskText !== '') {
            const newTaskItem = document.createElement('li');
            newTaskItem.innerHTML = `<input type="checkbox"> ${newTaskText}`;
            agendaList.insertBefore(newTaskItem, newTaskInput.parentNode); // Add before the input field
            newTaskInput.value = ''; // Clear the input
        }
    });

    newTaskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTaskButton.click(); // Trigger the add task button click on Enter
        }
    });

    // --- Interactive Promos Section ---
    promosBox.addEventListener('click', () => {
        promosBox.style.display = 'none';
        promoContent.style.display = 'block';
    });

    closePromoButton.addEventListener('click', () => {
        promosBox.style.display = 'block';
        promoContent.style.display = 'none';
    });


    // -- Dashboard Features

    document.addEventListener('DOMContentLoaded', () => {
        const recentOrdersList = document.getElementById('recent-orders-list');
        const lowStockItemsList = document.getElementById('low-stock-items-list');
        const viewAllOrdersButton = document.getElementById('view-all-orders');
        const viewLowStockInventoryButton = document.getElementById('view-low-stock-inventory');
    
        // --- Sample User-Specific Data ---
        const recentOrders = [
            { orderId: 'ORD-20250420-001', date: '2025-04-20', items: 3, total: '₱150.00' },
            { orderId: 'ORD-20250418-002', date: '2025-04-18', items: 1, total: '₱45.50' },
            // ... more orders ...
        ];
    
        const inventory = [
            { code: 'MED002', name: 'Amoxicillin 250mg', stock: 15 },
            { code: 'MED003', name: 'Insulin 100IU/ml', stock: 8 },
            // ... more inventory data ...
        ];
    
        function updateDashboard() {
            // Display Recent Orders
            if (recentOrders.length > 0) {
                recentOrdersList.innerHTML = recentOrders.slice(0, 5) // Show the latest 5
                    .map(order => `<li>Order ID: ${order.orderId}, Date: ${order.date}, Total: ${order.total}</li>`)
                    .join('');
            } else {
                recentOrdersList.innerHTML = '<li>No recent orders</li>';
            }
    
            // Display Low Stock Items
            const lowStockItems = inventory.filter(item => item.stock < 50);
            if (lowStockItems.length > 0) {
                lowStockItemsList.innerHTML = lowStockItems.map(item => `<li>${item.name} (${item.stock} left)</li>`).join('');
            } else {
                lowStockItemsList.innerHTML = '<li>No low stock items</li>';
            }
        }
    
        updateDashboard();
    
        viewAllOrdersButton.addEventListener('click', () => {
            alert('Navigating to Order History (Conceptual)');
            // In a real app, navigate to the user's order history page
        });
    
        viewLowStockInventoryButton.addEventListener('click', () => {
            alert('Navigating to Inventory Stocks (Conceptual)');
            // In a real app, navigate to the main inventory page
        });
    });
});