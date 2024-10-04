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
                window.location.href = 'login.html'; // Redirigir a la página de inicio de sesión
            } else {
                alert('Error al crear cuenta');
            }
        });
    });
}


