// Obtener el ID del usuario de la URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

document.addEventListener("DOMContentLoaded", function() {

    // Hacer la solicitud GET para obtener los datos del perfil
    fetch(`/api/users/${userId}`, {
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

        const nombreCompleto = `${data.nombre || '[Nombre]'} ${data.apellido || '[Apellido]'}`;

        // Asignar los datos obtenidos a los elementos HTML
        
        document.getElementById('usernameDisplay').textContent = nombreCompleto;
        document.getElementById('emailDisplay').textContent = data.email || '[Correo]';
        document.getElementById('userIdDisplay').textContent = data.id || '[ID]';

        // Actualizar la imagen de perfil si existe
        if (data.profile_pic) {
            document.getElementById('profilePic').src = data.profile_pic;
        }
    })
    .catch(error => {
        alert(`Error al obtener el perfil: ${error.message}`);
    });

    // Biografía
    fetch(`/api/users/${userId}/perfil`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Si estás usando autenticación
        }
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                throw new Error(data.error || 'Error desconocido');
            });
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('bioDisplay').textContent = data.biografia || '[Biografía]';
    })
    .catch(error => {
        alert(`Error al obtener la biografía: ${error.message}`);
    });

    // Dirección
    fetch(`/api/users/${userId}/direccion`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            throw new Error(data.error);
        }

        document.getElementById('countryDisplay').textContent = data.pais || '[País]';
        document.getElementById('stateDisplay').textContent = data.estado || '[Estado]';
        document.getElementById('cityDisplay').textContent = data.ciudad || '[Ciudad]';
        document.getElementById('postalCodeDisplay').textContent = data.codigo_postal || '[Código Postal]';
        document.getElementById('streetDisplay').textContent = data.calle || '[Calle]';
        document.getElementById('numberDisplay').textContent = data.numero || '[Número]';

    })
    .catch(error => {
        alert(`Error al obtener el Dirección: ${error.message}`);
    });
});