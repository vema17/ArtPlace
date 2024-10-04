const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Evita el envío del formulario por defecto
        const email = document.getElementById('email').value;
        const contrasena = document.getElementById('contrasena').value;

        // Lógica para iniciar sesión (enviar datos al backend)
        fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, contrasena })
        }).then(response => {
            if (response.ok) {
                return response.json(); // Procesar la respuesta como JSON
            } else {
                throw new Error('Error al iniciar sesión'); // Lanzar error si no es ok
            }
        }).then(data => {
            // Guardar el token en localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.id); // Guardar el ID del usuario en localStorage

            // Redirigir a perfil con el ID del usuario
            window.location.href = `profile.html?id=${data.id}`; // Cambiar aquí para incluir el ID
        }).catch(error => {
            alert(error.message); // Mostrar mensaje de error
        });
    });
}

const createAccountForm = document.getElementById('createAccountForm');
if (createAccountForm) {
    createAccountForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Evita el envío del formulario por defecto
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const email = document.getElementById('email').value; 
        const contrasena = document.getElementById('contrasena').value; 

        // Lógica para crear una cuenta (enviar datos al backend)
        fetch('/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, apellido, email, contrasena })
        }).then(response => {
            if (response.ok) {
                alert('Cuenta creada con éxito');
                window.location.href = 'index.html'; // Redirigir a la página de inicio de sesión
            } else {
                alert('Error al crear cuenta');
            }
        });
    });
}

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
    document.getElementById("editProfileForm").addEventListener("submit", function(e) {
        e.preventDefault();
        // Aquí puedes agregar la lógica para enviar los cambios al servidor usando AJAX
        alert("Perfil actualizado");
        $('#editProfileModal').modal('hide');
    });

    document.getElementById("changeAddressForm").addEventListener("submit", function(e) {
        e.preventDefault();
        // Aquí puedes agregar la lógica para enviar los cambios al servidor usando AJAX
        alert("Dirección actualizada");
        $('#changeAddressModal').modal('hide');
    });

    document.getElementById("changePasswordForm").addEventListener("submit", function(e) {
        e.preventDefault();
        // Aquí puedes agregar la lógica para cambiar la contraseña
        // Obtener valores de los campos
        const currentPassword = document.getElementById("currentPassword").value;
        const newPassword = document.getElementById("newPassword").value;

        // Validar que los campos no estén vacíos
        if (!currentPassword || !newPassword) {
            alert("Por favor, rellena ambos campos.");
            return;
        }

        // Enviar la solicitud AJAX al servidor
        fetch('api/users/change-password/:id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({currentPassword, newPassword}),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cambiar la contraseña');
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
            $('#changePasswordModal').modal('hide');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("Hubo un problema al cambiar la contraseña.");
        });
        $('#changePasswordModal').modal('hide');
    });
});



