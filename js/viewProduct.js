import { getProductById } from './api.js';

document.addEventListener("DOMContentLoaded", async () => {
    const errorMessage = document.getElementById('error-message');

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    function hideError() {
        errorMessage.style.display = 'none';
    }

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

        document.getElementById('product-name').textContent = product.nombre;
        document.getElementById('product-description').textContent = product.descripcion;
        document.getElementById('product-price').textContent = product.precio;
        document.getElementById('product-price-usd').textContent = product.precio_usd || 'No disponible';
    } catch (error) {
        console.error('Error al cargar el producto:', error);
        showError('Hubo un problema al cargar los datos del producto.');
    }
});
