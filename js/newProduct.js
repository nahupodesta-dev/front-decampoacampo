import { createProduct } from './api.js';

document.addEventListener("DOMContentLoaded", () => {
    const newProductForm = document.getElementById('new-product-form');
    const errorMessage = document.getElementById('error-message');

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    function hideError() {
        errorMessage.style.display = 'none';
    }

    newProductForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        hideError(); 
        const newProduct = {
            nombre: document.getElementById('product-name').value.trim(),
            descripcion: document.getElementById('product-description').value.trim(),
            precio: parseFloat(document.getElementById('product-price').value)
        };

        if (!newProduct.nombre || !newProduct.descripcion || isNaN(newProduct.precio) || newProduct.precio <= 0) {
            showError('Por favor, completa todos los campos correctamente.');
            return;
        }

        try {
            await createProduct(newProduct);
            alert('Producto creado exitosamente');
            window.location.href = '/index.html';
        } catch (error) {
            console.error('Error al crear el producto:', error);
            showError('Hubo un problema al crear el producto. Intenta de nuevo.');
        }
    });
});
