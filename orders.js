document.addEventListener('DOMContentLoaded', () => {
    const ordersTableBody = document.getElementById('orders-table-body');
    const addNewOrderButton = document.getElementById('add-new-order');
    const statusFilter = document.getElementById('status-filter');
    const dateFilter = document.getElementById('date-filter');
    const applyOrderFiltersButton = document.getElementById('apply-order-filters');
    const searchInput = document.querySelector('.main-orders-search input[type="text"]');

    // Sample initial orders data
    let orders = [
        { orderId: 'ORD-20250420-001', customer: 'John Doe', orderDate: '2025-04-20', totalItems: 3, totalAmount: 150.00, status: 'delivered' },
        { orderId: 'ORD-20250419-002', customer: 'Jane Smith', orderDate: '2025-04-19', totalItems: 1, totalAmount: 45.50, status: 'shipped' },
        { orderId: 'ORD-20250418-003', customer: 'Peter Jones', orderDate: '2025-04-18', totalItems: 5, totalAmount: 210.75, status: 'processing' },
        { orderId: 'ORD-20250417-004', customer: 'Alice Brown', orderDate: '2025-04-17', totalItems: 2, totalAmount: 75.20, status: 'delivered' },
        { orderId: 'ORD-20250416-005', customer: 'Bob Green', orderDate: '2025-04-16', totalItems: 4, totalAmount: 185.90, status: 'pending' },
        { orderId: 'ORD-20250415-006', customer: 'Charlie White', orderDate: '2025-04-15', totalItems: 1, totalAmount: 12.00, status: 'cancelled' },
    ];

    function renderOrders(ordersToRender = orders) {
        ordersTableBody.innerHTML = '';
        if (ordersToRender.length === 0) {
            const emptyRow = ordersTableBody.insertRow();
            const emptyCell = emptyRow.insertCell();
            emptyCell.colSpan = 7;
            emptyCell.textContent = 'No orders found matching your criteria.';
            emptyCell.style.textAlign = 'center';
            emptyCell.style.padding = '15px';
            emptyCell.style.color = '#7f8c8d';
        } else {
            ordersToRender.forEach(order => {
                const row = ordersTableBody.insertRow();
                row.innerHTML = `
                    <td>${order.orderId}</td>
                    <td>${order.customer}</td>
                    <td>${order.orderDate}</td>
                    <td>${order.totalItems}</td>
                    <td>₱${order.totalAmount.toFixed(2)}</td>
                    <td class="status-${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</td>
                    <td class="actions-cell">
                        <button class="view-btn">View</button>
                    </td>
                `;
                row.querySelector('.view-btn').addEventListener('click', () => viewOrderDetails(order.orderId));
            });
        }
    }

    function viewOrderDetails(orderId) {
        alert(`Viewing details for Order ID: ${orderId} (Conceptual)`);
        // In a real application, you would navigate to a detailed order page or show a modal
    }

    addNewOrderButton.addEventListener('click', () => {
        alert('Functionality to add a new order will be implemented here (Conceptual)');
        // In a real application, you would show a form to create a new order
    });

    applyOrderFiltersButton.addEventListener('click', () => {
        const selectedStatus = statusFilter.value;
        const selectedDate = dateFilter.value;

        let filteredOrders = [...orders];

        if (selectedStatus) {
            filteredOrders = filteredOrders.filter(order => order.status === selectedStatus);
        }

        if (selectedDate) {
            filteredOrders = filteredOrders.filter(order => order.orderDate === selectedDate);
        }

        renderOrders(filteredOrders);
    });

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const searchedOrders = orders.filter(order =>
            order.orderId.toLowerCase().includes(searchTerm) ||
            order.customer.toLowerCase().includes(searchTerm)
        );
        renderOrders(searchedOrders);
    });

    renderOrders(orders); // Initial rendering
});