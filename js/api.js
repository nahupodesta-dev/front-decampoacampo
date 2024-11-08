
const API_BASE_URL = 'http://localhost:8000';

export async function getProducts() {
    try {
        const response = await fetch(`${API_BASE_URL}/productos`);
        const result = await response.json();
        if (Array.isArray(result.data)) {
            return result.data;
        } else {
            throw new Error('La propiedad data de la respuesta no es un array');
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

export async function getProductById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/productos/${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
}

export async function createProduct(product) {
    try {
        const response = await fetch(`${API_BASE_URL}/productos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });
        if (!response.ok) {
            throw new Error('Error al crear el producto');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
}

export async function deleteProductById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/productos/${id}`, { method: 'DELETE' });
        if (!response.ok) {
            throw new Error('Error al eliminar el producto');
        }
        return response;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
}

export async function updateProductById(id, updatedProduct) {
    try {
        const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProduct),
        });
        if (!response.ok) {
            throw new Error('Error al actualizar el producto');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
}
