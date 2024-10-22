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
            alert('Inicio de sesión exitoso');
            localStorage.setItem('userId', data.id); // Guardar el ID en localStorage
            window.location.href = `profile.html?id=${data.id}`; // Redirigir a perfil con el ID del usuario
        }).catch(error => {
            alert(error.message); // Mostrar mensaje de error
        });
    });
}