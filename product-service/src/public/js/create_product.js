async function submitForm() {
    const form = document.getElementById('addProductForm');
    const formData = new FormData(form);

    // Obtener y procesar las etiquetas
    const etiquetas = document.getElementById('etiquetas').value.split(',').map(tag => tag.trim());
    formData.append("etiquetas", JSON.stringify(etiquetas)); // Convertir a JSON para manejar arrays

    // Mensaje de carga
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = "Enviando...";
    messageDiv.className = "";

    try {
        const response = await fetch('/api/products/agregar', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (response.ok) {
            messageDiv.textContent = "Cuadro agregado exitosamente.";
            messageDiv.className = "success";
            form.reset(); // Limpiar el formulario
        } else {
            messageDiv.textContent = `Error: ${result.message || 'No se pudo agregar el cuadro.'}`;
            messageDiv.className = "error";
        }
    } catch (error) {
        messageDiv.textContent = `Error: ${error.message}`;
        messageDiv.className = "error";
    }
}