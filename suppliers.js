document.addEventListener('DOMContentLoaded', () => {
    const suppliersTableBody = document.getElementById('suppliers-table-body');
    const addNewSupplierButton = document.getElementById('add-new-supplier');
    const searchInput = document.querySelector('.main-suppliers-search input[type="text"]');

    // Sample initial suppliers data
    let suppliers = [
        { supplierId: 'SUP001', name: 'MediCorp Inc.', contactPerson: 'Alice Johnson', email: 'alice.j@medicorp.com', phone: '123-456-7890', address: '1 Main St, Anytown' },
        { supplierId: 'SUP002', name: 'Global Pharma', contactPerson: 'Bob Williams', email: 'bob.w@globalpharma.net', phone: '987-654-3210', address: '10 Pharma Ave, Healthville' },
        { supplierId: 'SUP003', name: 'CarePlus Supplies', contactPerson: 'Catherine Davis', email: 'cathy.d@careplus.org', phone: '555-123-4567', address: '22 Medical Rd, Curecity' },
    ];

    function renderSuppliers(suppliersToRender = suppliers) {
        suppliersTableBody.innerHTML = '';
        if (suppliersToRender.length === 0) {
            const emptyRow = suppliersTableBody.insertRow();
            const emptyCell = emptyRow.insertCell();
            emptyCell.colSpan = 7;
            emptyCell.textContent = 'No suppliers found.';
            emptyCell.style.textAlign = 'center';
            emptyCell.style.padding = '15px';
            emptyCell.style.color = '#7f8c8d';
        } else {
            suppliersToRender.forEach(supplier => {
                const row = suppliersTableBody.insertRow();
                row.innerHTML = `
                    <td>${supplier.supplierId}</td>
                    <td>${supplier.name}</td>
                    <td>${supplier.contactPerson}</td>
                    <td>${supplier.email}</td>
                    <td>${supplier.phone}</td>
                    <td>${supplier.address}</td>
                    <td class="actions-cell">
                        <button class="edit-btn">✎</button>
                        <button class="delete-btn">✕</button>
                    </td>
                `;
                row.querySelector('.delete-btn').addEventListener('click', () => deleteSupplier(supplier.supplierId));
                row.querySelector('.edit-btn').addEventListener('click', () => editSupplier(supplier.supplierId));
            });
        }
    }

    function deleteSupplier(supplierIdToDelete) {
        suppliers = suppliers.filter(supplier => supplier.supplierId !== supplierIdToDelete);
        renderSuppliers();
    }

    function editSupplier(supplierIdToEdit) {
        alert(`Editing supplier with ID: ${supplierIdToEdit} (Conceptual)`);
        // In a real application, you would show a form to edit supplier details
    }

    addNewSupplierButton.addEventListener('click', () => {
        alert('Functionality to add a new supplier will be implemented here (Conceptual)');
        // In a real application, you would show a form to create a new supplier
    });

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const searchedSuppliers = suppliers.filter(supplier =>
            supplier.name.toLowerCase().includes(searchTerm) ||
            supplier.contactPerson.toLowerCase().includes(searchTerm) ||
            supplier.email.toLowerCase().includes(searchTerm) ||
            supplier.phone.toLowerCase().includes(searchTerm)
        );
        renderSuppliers(searchedSuppliers);
    });

    renderSuppliers(suppliers); // Initial rendering
});