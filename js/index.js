import { getProducts, deleteProductById } from './api.js';

document.addEventListener("DOMContentLoaded", async () => {
    const newProductBtn = document.getElementById('new-product-btn');
    const productList = document.getElementById('product-list');
    const errorMessage = document.getElementById('error-message');

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    function hideError() {
        errorMessage.style.display = 'none';
    }

    async function productsTable() {
        try {
            hideError();
            const products = await getProducts();
            productList.innerHTML = '';
            products.forEach(product => {
                let row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.nombre}</td>
                    <td>${product.descripcion}</td>
                    <td>${product.precio}</td>
                    <td>${product.precio_usd}</td>
                    <td>
                        <button class="action-btn" onclick="viewProduct(${product.id})">Ver</button>
                        <button class="action-btn" onclick="editProduct(${product.id})">Editar</button>
                        <button class="action-btn" onclick="confirmDeleteProduct(${product.id})">Borrar</button>
                    </td>
                `;
                productList.appendChild(row);
            });
        } catch (error) {
            console.error('Error displaying products:', error);
            showError('No se pudo obtener la lista de productos.');
        }
    }
    
    newProductBtn.addEventListener('click', () => {
        window.location.href = '/views/newProduct.html';
    });

    window.viewProduct = function (id) {
        window.location.href = `/views/viewProduct.html?id=${id}`;
    };

    window.editProduct = function (id) {
        window.location.href = `/views/editProduct.html?id=${id}`;
    };

    window.confirmDeleteProduct = async function (id) {
        const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este producto?");
        if (confirmDelete) {
            try {
                await deleteProductById(id);
                alert('Producto eliminado exitosamente');
                productsTable();
            } catch (error) {
                console.error('Error deleting product:', error);
                showError('No se pudo eliminar el producto.');
            }
        }
    };

    productsTable();
});
