function submitForm() {
    const form = document.getElementById('addProductForm');
    const messageElement = document.getElementById('message');

    // Añadir el ID del usuario al formulario
    const formData = new FormData(form);

    fetch('/api/products/agregar', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            messageElement.textContent = "Cuadro agregado exitosamente.";
            messageElement.style.color = "green";
            form.reset();
        } else {
            throw new Error("Error al agregar el cuadro.");
        }
    })
    .catch(error => {
        messageElement.textContent = error.message;
        messageElement.style.color = "red";
    });
}
