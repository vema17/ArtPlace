// Obtener el ID del usuario de la URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id'); 

// Redirige al login si no hay userId
if (!userId) {
    window.location.href = `login.html`;
}

document.addEventListener("DOMContentLoaded", function() {
    console.log(`Id DE USUARIO: ${userId}`); // Log para confirmar ID

    // Actualiza los enlaces con userId
    const linksToUpdate = [
        { id: 'homeLink', href: `home.html?id=${userId}` },
        { id: 'perfilLink', href: `profile.html?id=${userId}` },
        { id: 'crearPerfilLink', href: `createProfile.html?id=${userId}` },
        { id: 'editarDireccionLink', href: `address.html?id=${userId}` },
        { id: 'cambiarContrasenaLink', href: `password.html?id=${userId}` },
        { id: 'catalogoLink', href: `home.html?id=${userId}` }
    ];

    linksToUpdate.forEach(linkInfo => {
        const linkElement = document.getElementById(linkInfo.id);
        if (linkElement) {
            linkElement.href = linkInfo.href;
        }
    });

    // Verifica si el perfil existe para habilitar/deshabilitar links
    fetch(`/api/users/${userId}/perfil`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Si se usa autenticación
        }
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 404) {
                const editarDireccionLink = document.getElementById('editarDireccionLink');
                if (editarDireccionLink) {
                    editarDireccionLink.classList.add('disabled');
                    editarDireccionLink.style.pointerEvents = 'none';
                    editarDireccionLink.style.opacity = '0.5';
                }
                console.warn('Perfil no encontrado');
            }
            return response.json().then(data => {
                throw new Error(data.error || 'Error desconocido');
            });
        }
        return response.json();
    })
    .then(data => {
        console.log(`Perfil encontrado: ${data.nombre_usuario}`);
    })
    .catch(error => {
        console.error(error.message);
    });

    // Obtener datos del perfil
    fetch(`/api/users/${userId}`, {
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

        const nombreCompleto = `${data.nombre || '[Nombre]'} ${data.apellido || '[Apellido]'}`;
        document.getElementById('usernameDisplay').textContent = nombreCompleto;
        document.getElementById('emailDisplay').textContent = data.email || '[Correo]';
        document.getElementById('userIdDisplay').textContent = data.id || '[ID]';
    })
    .catch(error => {
        console.error(`Error al obtener el perfil: ${error.message}`);
    });

    // Obtener biografía
    fetch(`/api/users/${userId}/perfil`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
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
        if (data.foto_perfil) {
            document.getElementById('profilePic').src = `/uploads/profile_${userId}.jpg`; 
        }
    })
    .catch(error => {
        console.error(error.message);
    });

    // Obtener dirección
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
        console.error(`Error al obtener la Dirección: ${error.message}`);
    });
});
