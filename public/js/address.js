// Obtener el ID del usuario de la URL
const urlParams = new URLSearchParams(window.location.search);

document.addEventListener("DOMContentLoaded", function() {
    const userId = localStorage.getItem('userId'); // Recuperar el ID del usuario de localStorage
    const form = document.querySelector('form');

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Evita el envío del formulario por defecto

        // Obtener los valores de los campos
        const pais = document.getElementById('pais').value;
        const estado = document.getElementById('estado').value;
        const ciudad = document.getElementById('ciudad').value;
        const codigo_postal = document.getElementById('codigoPostal').value;
        const calle = document.getElementById('calle').value;
        const numero = document.getElementById('numero').value;

        // Verificar si los campos tienen valores
        if (!calle || !numero || !ciudad || !estado || !codigo_postal || !pais) {
            alert('Por favor, completa todos los campos');
            return;
        }

        // Depurar: Verificar que los datos son correctos
        console.log({ calle, numero, ciudad, estado, codigo_postal, pais });

        // Llamada fetch para enviar los datos al servidor
        // Llamada fetch para enviar los datos al servidor
        fetch(`/api/users/${userId}/direccion`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ calle, numero, ciudad, estado, codigo_postal, pais })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            alert('Dirección actualizada correctamente');
        })
        .catch(error => {
            alert(`Error al actualizar la dirección: ${error.message}`);
        });
    });
});
