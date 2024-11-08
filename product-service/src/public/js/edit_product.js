// Cargar los datos del producto para editar
function loadProductData() {
    document.getElementById('id_usuario').value = productToEdit.id;
    document.getElementById('titulo').value = productToEdit.titulo;
    document.getElementById('descripcion').value = productToEdit.descripcion;
    document.getElementById('artista').value = productToEdit.artista;
    document.getElementById('altura').value = productToEdit.altura;
    document.getElementById('anchura').value = productToEdit.anchura;
    document.getElementById('precio').value = productToEdit.precio;
    document.getElementById('categoria').value = productToEdit.categoria;
    document.getElementById('estilo').value = productToEdit.estilo;
    document.getElementById('tecnica').value = productToEdit.tecnica;
}

// Función para validar y enviar el formulario de edición
function submitEditForm() {
    const form = document.getElementById('editProductForm');
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

    // Realizar una solicitud PUT para actualizar el producto
    fetch(`/api/products/${productToEdit.id}`, {
        method: 'PUT',
        body: formData // Enviar el FormData para incluir la imagen
    })
    .then(response => {
        if (response.ok) {
            messageElement.textContent = "Cuadro actualizado exitosamente.";
            messageElement.style.color = "green";
            form.reset(); // Limpiar el formulario después de editar el cuadro
        } else {
            throw new Error("Error al actualizar el cuadro.");
        }
    })
    .catch(error => {
        messageElement.textContent = error.message;
        messageElement.style.color = "red";
    });
}

// Cargar los datos del producto cuando se cargue la página
document.addEventListener('DOMContentLoaded', loadProductData);
