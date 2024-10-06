// Obtener el ID del usuario de la URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

document.addEventListener("DOMContentLoaded", function() {
    // Seleccionar los botones
    const editProfileButton = document.getElementById("editProfile");
    const changeAddressButton = document.getElementById("changeAddress");
    const changePasswordButton = document.getElementById("changePassword");

    // Mostrar el modal para editar perfil
    editProfileButton.addEventListener("click", function() {
        $('#editProfileModal').modal('show');
    });

    // Mostrar el modal para cambiar dirección
    changeAddressButton.addEventListener("click", function() {
        $('#changeAddressModal').modal('show');
    });

    // Mostrar el modal para cambiar contraseña
    changePasswordButton.addEventListener("click", function() {
        $('#changePasswordModal').modal('show');
    });

    // Agregar eventos a los formularios (si es necesario)
    document.getElementById('editProfileForm').addEventListener('submit', function (e) {
        e.preventDefault();
    
        const formData = new FormData();
        const username = document.getElementById('username').value;
        const bio = document.getElementById('bio').value;
        const profileImage = document.getElementById('profileImageInput').files[0];
    
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
            $('#editProfileModal').modal('hide'); // Cierra el modal
            window.location.reload(); 
        })
        .catch(error => {
            alert(`Error al actualizar el perfil: ${error.message}`);
        });
    });
    
    document.getElementById('changeAddressForm').addEventListener('submit', function (e) {
        e.preventDefault();
    
        const calle = document.getElementById('street').value;
        const numero = document.getElementById('streetNumber').value;
        const ciudad = document.getElementById('city').value;
        const estado = document.getElementById('state').value;
        const codigo_postal = document.getElementById('postalCode').value;
    
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
            $('#changeAddressModal').modal('hide');  // Cerrar el modal
        })
        .catch(error => {
            alert(`Error al actualizar la dirección: ${error.message}`);
        });
    });
    

    // Manejar el cambio de contraseña
    document.getElementById('changePasswordForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const passwords = {
        currentPassword: document.getElementById('currentPassword').value,
        newPassword: document.getElementById('newPassword').value
    };

    fetch(`/api/users/${userId}/change-password`, { // Actualiza la URL a la ruta que acabamos de crear
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
            // Puedes cerrar el modal si lo deseas
            $('#changePasswordModal').modal('hide');
        })
        .catch(error => {
            console.error(error);
            alert('Error al cambiar la contraseña');
        });
    });
});


// Añadir el event listener al botón
document.getElementById('createProfileBtn').addEventListener('click', function() {
    // Redirigir a createProfile.html con el ID como parámetro en la URL
    window.location.href = `/createProfile.html?id=${userId}`;
});

// Verificar si se obtuvo el ID
if (userId) {
    // Hacer una solicitud al backend para obtener información del usuario
    fetch(`/api/users/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener información del usuario');
            }
            return response.json();
        })
        .then(userData => {
            // Rellenar el contenido del perfil
            document.getElementById('usernameDisplay').textContent = userData.nombre;
            document.getElementById('username').value = userData.nombre; // Rellenar el campo en el modal
            document.getElementById('bio').value = userData.bio || ''; // Suponiendo que también tienes un campo bio
            // Aquí puedes agregar más campos según la información disponible
        })
        .catch(error => {
            console.error(error);
            alert('Error al cargar la información del usuario');
        });
} else {
    alert('ID de usuario no encontrado');
}

document.getElementById('profileImage').src = `/uploads/profile_${userId}.jpg`; 