const urlParams = new URLSearchParams(window.location.search);
const userId = localStorage.getItem('userId'); // Recuperar el ID del usuario de localStorage

if (!userId) {
    alert('No se encontró el ID de usuario');
    return;
}

document.getElementById('editarPerfilForm').addEventListener('submit', function (e) {
    e.preventDefault();
    console.log("Formulario enviado");
    
    const formData = new FormData();
    const username = document.getElementById('nombreUsuario').value;
    const bio = document.getElementById('biografia').value;
    const profileImage = document.getElementById('fotoPerfil').files[0];

    formData.append('nombre_usuario', username);
    formData.append('bio', bio);
    if (profileImage) {
        formData.append('profileImageInput', profileImage);
    }

    fetch(`/api/users/${userId}/perfil`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Si estás usando autenticación
        },
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            throw new Error(data.error);
        }
        alert('Perfil actualizado correctamente');
    })
    .catch(error => {
        alert(`Error al actualizar el perfil: ${error.message}`);
    });
});
