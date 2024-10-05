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
    
        const nombre_usuario = document.getElementById('nombre_usuario').value;
        const bio = document.getElementById('bio').value;
        const profileImageInput = document.getElementById('profileImageInput');
    
        const formData = new FormData();
        formData.append('nombre', nombre_usuario);
        formData.append('bio', bio);
        if (profileImageInput.files[0]) {
            formData.append('profileImage', profileImageInput.files[0]);
        }
    
        fetch(`/api/users/${userId}/perfil`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: formData
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al editar el perfil');
            }
        })
        .then(data => {
            alert(data.message);
            $('#editProfileModal').modal('hide'); // Cerrar el modal
            document.getElementById('usernameDisplay').textContent = nombre_usuario; // Actualizar el nombre en el perfil
        })
        .catch(error => {
            alert(error.message);
        });
    });
    

    document.getElementById('changeAddressForm').addEventListener('submit', function (e) {
        e.preventDefault();
    
        const street = document.getElementById('street').value;
        const streetNumber = document.getElementById('streetNumber').value;
        const city = document.getElementById('city').value;
        const state = document.getElementById('state').value;
        const postalCode = document.getElementById('postalCode').value;
    
        fetch(`/api/users/${userId}/direccion`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ street, streetNumber, city, state, postalCode })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al cambiar la dirección');
            }
        })
        .then(data => {
            alert(data.message);
            $('#changeAddressModal').modal('hide'); // Cerrar el modal
        })
        .catch(error => {
            alert(error.message);
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

// Obtener el ID del usuario de la URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

// Añadir el event listener al botón
document.getElementById('createProfileBtn').addEventListener('click', function() {
    // Redirigir a createProfile.html con el ID como parámetro en la URL
    window.location.href = `/createProfile.html?id=${userId}`;
});

// Función para cargar el perfil del usuario
function loadUserProfile() {
    fetch(`/api/users/${userId}/perfil`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('profileImage').src = data.profileImage || 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'; // Cambia a la imagen de perfil si existe
        })
        .catch(error => {
            console.error('Error al cargar el perfil:', error);
        });
}

// Llamar a la función para cargar el perfil al cargar la página
window.onload = loadUserProfile;

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