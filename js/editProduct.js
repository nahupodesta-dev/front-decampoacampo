import { getProductById, updateProductById } from './api.js';

document.addEventListener("DOMContentLoaded", async () => {
    const editProductForm = document.getElementById('edit-product-form');
    const errorMessage = document.getElementById('error-message');

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    function hideError() {
        errorMessage.style.display = 'none';
    }


    async function loadProductData() {
        const params = new URLSearchParams(window.location.search);
        const productId = params.get('id');

        if (!productId) {
            showError('ID del producto no especificado.');
            return;
        }

        try {
            hideError();
            const response = await getProductById(productId);

            const product = response.data;
            if (!product || !product.nombre || !product.descripcion || product.precio === undefined) {
                showError('Datos del producto incompletos o no encontrados.');
                return;
            }

            document.getElementById('product-name').value = product.nombre || '';
            document.getElementById('product-description').value = product.descripcion || '';
            document.getElementById('product-price').value = product.precio || 0;
        } catch (error) {
            console.error('Error al cargar el producto:', error);
            showError('Hubo un problema al cargar los datos del producto.');
        }
    }


    async function handleFormSubmit(e) {
        e.preventDefault();
        hideError();

        const params = new URLSearchParams(window.location.search);
        const productId = params.get('id');

        const updatedProduct = {
            nombre: document.getElementById('product-name').value.trim(),
            descripcion: document.getElementById('product-description').value.trim(),
            precio: parseFloat(document.getElementById('product-price').value)
        };

        if (!updatedProduct.nombre || !updatedProduct.descripcion || isNaN(updatedProduct.precio) || updatedProduct.precio <= 0) {
            showError('Por favor, completa todos los campos correctamente.');
            return;
        }

        try {
            await updateProductById(productId, updatedProduct);
            alert('Producto actualizado exitosamente');
            window.location.href = '/index.html';
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            showError('Hubo un problema al actualizar el producto. Intenta de nuevo.');
        }
    }

    await loadProductData();

    editProductForm.addEventListener('submit', handleFormSubmit);
});
