// Obtener el ID del usuario de la URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id'); 

document.addEventListener('DOMContentLoaded', () => {
     // const userId = localStorage.getItem('userId'); // Recuperar el ID del usuario de localStorage
    console.log(`Id DE USUARIO: ${userId}`);
    
    // Array of link elements to modify
    const linksToUpdate = [
        { id: 'homeLink', href: `home.html?id=${userId}` },
        { id: 'perfilLink', href: `profile.html?id=${userId}` },
        { id: 'crearPerfilLink', href: `createProfile.html?id=${userId}` },
        { id: 'editarDireccionLink', href: `address.html?id=${userId}` },
        { id: 'cambiarContrasenaLink', href: `password.html?id=${userId}` },
        { id: 'catalogoLink', href: `home.html?id=${userId}` }
    ];

    // Update each link's href with userId
    linksToUpdate.forEach(linkInfo => {
        const linkElement = document.getElementById(linkInfo.id);
        if (linkElement) {
            linkElement.href = linkInfo.href;
        }
    });
    
    fetch(`/api/users/${userId}/perfil`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Autenticación si aplica
        }
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 404) {
                // Si el perfil no se encuentra, desactiva el botón
                const editarDireccionLink = document.getElementById('editarDireccionLink');
                editarDireccionLink.classList.add('disabled');
                editarDireccionLink.style.pointerEvents = 'none';
                editarDireccionLink.style.opacity = '0.5';
                console.warn('Perfil no encontrado');
            }
            return response.json().then(data => {
                throw new Error(data.error || 'Error desconocido');
            });
        }
        return response.json();
    })
    .then(data => {
        // Aquí puedes manejar la información del perfil sin mostrar alertas
        console.log(`Perfil encontrado: ${data.nombre_usuario}`);
    })
    .catch(error => {
        console.error(error.message); // Manejo de errores en la consola
    });
});

document.getElementById('editarPassword').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const userId = localStorage.getItem('userId'); // Recuperar el ID del usuario desde localStorage
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;
    
    // Validar que las contraseñas coincidan
    if (newPassword !== confirmNewPassword) {
        alert('La nueva contraseña y la confirmación no coinciden.');
        return;
    }

    const passwords = {
        currentPassword: currentPassword,
        newPassword: newPassword
    };

    fetch(`/api/users/${userId}/change-password`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(passwords)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cambiar la contraseña');
        }
        alert('Contraseña cambiada con éxito');
        // Limpiar el formulario
        document.getElementById('currentPassword').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmNewPassword').value = '';
    })
    .catch(error => {
        console.error(error);
        alert('Error al cambiar la contraseña');
    });
});
