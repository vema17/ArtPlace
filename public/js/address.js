// Obtener el ID del usuario de la URL
const urlParams = new URLSearchParams(window.location.search);

document.addEventListener("DOMContentLoaded", function() {

    const userId = localStorage.getItem('userId'); // Recuperar el ID del usuario de localStorage

    // Hacer la solicitud GET para obtener los datos de la dirección
    fetch(`/api/users/${userId}/direccion`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Si estás usando autenticación
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            throw new Error(data.error);
        }

        document.getElementById('estado').value = data.estado || '';
        document.getElementById('ciudad').value = data.ciudad || '';
        document.getElementById('codigoPostal').value = data.codigo_postal || '';
        document.getElementById('calle').value = data.calle || '';
        document.getElementById('numero').value = data.numero || '';
    })
    .catch(error => {
        alert(`Error al obtener la dirección: ${error.message}`);
    });

    // Escuchar el evento submit del formulario
    const addressForm = document.getElementById('addressForm');
    if (addressForm) {
        addressForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita el envío del formulario por defecto

            // Obtener los valores de los campos del formulario
            const calle = document.getElementById('calle').value;
            const numero = document.getElementById('numero').value;
            const ciudad = document.getElementById('ciudad').value;
            const estado = document.getElementById('estado').value;
            const codigo_postal = document.getElementById('codigoPostal').value;

            // Verificar si los campos tienen valores
            if (!calle || !numero || !ciudad || !estado || !codigo_postal) {
                alert('Por favor, completa todos los campos');
                return;
            }

            // Depurar: Verificar que los datos son correctos
            console.log({ calle, numero, ciudad, estado, codigo_postal });

            // Llamada fetch para enviar los datos al servidor
            fetch(`/api/users/${userId}/direccion`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ calle, numero, ciudad, estado, codigo_postal })
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
    }
});
