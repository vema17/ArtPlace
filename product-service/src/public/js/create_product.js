function submitForm() {
    const form = document.getElementById('addProductForm');
    const messageElement = document.getElementById('message');

    // Obtener el ID del usuario desde localStorage
    const userId = localStorage.getItem('userId');
    if (!userId) {
        messageElement.textContent = "No se ha encontrado el ID del usuario. Por favor, inicia sesión.";
        messageElement.style.color = "red";
        return;
    }

    // Añadir el ID del usuario al formulario
    const formData = new FormData(form);
    formData.append('id_usuario', userId);

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
