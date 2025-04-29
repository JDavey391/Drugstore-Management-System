document.addEventListener('DOMContentLoaded', () => {
    const expiredProductsTableBody = document.getElementById('expired-products-table-body');
    const expiryDateFilter = document.getElementById('expiry-date-filter');
    const applyExpiryFilterButton = document.getElementById('apply-expiry-filter');
    const clearExpiryFilterButton = document.getElementById('clear-expiry-filter');
    const searchInput = document.querySelector('.main-expired-search input[type="text"]');
    const totalExpiredStat = document.querySelector('.expired-products-stats .total-expired .stat-value');

    // Sample initial expired products data
    let expiredProducts = [
        { code: 'EXP001', name: 'Old Paracetamol', category: 'Pain Relief', stock: 5, expiry: '2025-03-15' },
        { code: 'EXP002', name: 'Expired Amoxicillin', category: 'Antibiotics', stock: 2, expiry: '2025-02-20' },
        { code: 'EXP003', name: 'Bad Insulin', category: 'Diabetes', stock: 1, expiry: '2025-01-30' },
        { code: 'EXP004', name: 'Outdated Loratadine', category: 'Allergy', stock: 10, expiry: '2024-12-01' },
    ];

    function renderExpiredProducts(productsToRender = expiredProducts) {
        expiredProductsTableBody.innerHTML = '';
        if (productsToRender.length === 0) {
            const emptyRow = expiredProductsTableBody.insertRow();
            const emptyCell = emptyRow.insertCell();
            emptyCell.colSpan = 6;
            emptyCell.textContent = 'No expired products found matching your criteria.';
            emptyCell.style.textAlign = 'center';
            emptyCell.style.padding = '15px';
            emptyCell.style.color = '#7f8c8d';
        } else {
            productsToRender.forEach(product => {
                const row = expiredProductsTableBody.insertRow();
                row.innerHTML = `
                    <td>${product.code}</td>
                    <td>${product.name}</td>
                    <td>${product.category}</td>
                    <td>${product.stock}</td>
                    <td class="expired">${product.expiry}</td>
                    <td class="actions-cell">
                        <button class="remove-btn">Remove</button>
                    </td>
                `;
                row.querySelector('.remove-btn').addEventListener('click', () => removeExpiredProduct(product.code));
            });
        }
        totalExpiredStat.textContent = productsToRender.length;
    }

    function removeExpiredProduct(codeToRemove) {
        expiredProducts = expiredProducts.filter(product => product.code !== codeToRemove);
        renderExpiredProducts();
    }

    applyExpiryFilterButton.addEventListener('click', () => {
        const selectedExpiryDate = expiryDateFilter.value;
        let filteredProducts = [...expiredProducts];

        if (selectedExpiryDate) {
            filteredProducts = filteredProducts.filter(product => product.expiry <= selectedExpiryDate);
        }

        renderExpiredProducts(filteredProducts);
    });

    clearExpiryFilterButton.addEventListener('click', () => {
        expiryDateFilter.value = '';
        renderExpiredProducts();
    });

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const searchedProducts = expiredProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.code.toLowerCase().includes(searchTerm)
        );
        renderExpiredProducts(searchedProducts);
    });

    renderExpiredProducts(expiredProducts); // Initial rendering
});