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
