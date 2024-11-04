// Función para validar y enviar el formulario
function submitForm() {
    const form = document.getElementById('addProductForm');
    const messageElement = document.getElementById('message');

    // Crear un FormData para manejar archivos y otros datos
    const formData = new FormData(form);

    // Validación básica de campos requeridos
    const requiredFields = ["titulo", "descripcion", "artista", "altura", "anchura", "precio", "categoria", "estilo", "tecnica"];
    for (const field of requiredFields) {
        if (!formData.get(field)) {
            messageElement.textContent = `Por favor, completa el campo ${field}.`;
            messageElement.style.color = "red";
            return;
        }
    }

    // Realizar una solicitud POST para enviar los datos al servidor
    fetch('/api/agregar', {
        method: 'POST',
        body: formData // Enviar el FormData para incluir la imagen
    })
    .then(response => {
        if (response.ok) {
            messageElement.textContent = "Cuadro agregado exitosamente.";
            messageElement.style.color = "green";
            form.reset(); // Limpiar el formulario después de agregar el cuadro
        } else {
            throw new Error("Error al agregar el cuadro.");
        }
    })
    .catch(error => {
        messageElement.textContent = error.message;
        messageElement.style.color = "red";
    });
}
