function submitForm() {
    const form = document.getElementById('addProductForm');
    const formData = new FormData(form);

    fetch('/api/products/agregar', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.status === 401) {
            throw new Error("No autorizado. Por favor, inicia sesión.");
        }
        if (!response.ok) {
            throw new Error("Error al agregar el producto.");
        }
        return response.json();
    })
    .then(data => {
        console.log("Producto agregado exitosamente:", data);
    })
    .catch(error => {
        console.error("Error:", error);
    });
}
