/*const createAccountForm = document.getElementById('createAccountForm');
if (createAccountForm) {
    createAccountForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Evita el envío del formulario por defecto
        const email = document.getElementById('email').value; 
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
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
} */

const createAccountForm = document.getElementById('createAccountForm');

if (createAccountForm) {
    createAccountForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Datos básicos
        const email = document.getElementById('email').value;
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const contrasena = document.getElementById('contrasena').value;

        // Datos de perfil
        const nombre_usuario = document.getElementById('nombre_usuario').value;

        // Datos de dirección
        const street = document.getElementById('calle').value;
        const streetNumber = document.getElementById('numero').value;
        const city = document.getElementById('ciudad').value;
        const state = document.getElementById('estado').value;
        const postalCode = document.getElementById('codigo_postal').value;
        const country = document.getElementById('pais').value;

        // Datos de contactos
        const contact = document.getElementById('contacto').value.trim();

        // Enviar los datos al backend
        fetch('/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre,
                apellido,
                email,
                contrasena,
                nombre_usuario,          
                street,
                streetNumber,
                city,
                state,
                postalCode,
                country,
                contacto: contact
            })
        })
        .then(response => {
            if (response.ok) {
                alert('Cuenta creada con éxito');
                window.location.href = 'login.html';
            } else {
                return response.json().then(data => {
                    throw new Error(data.error || 'Error al crear la cuenta');
                });
            }
        })
        .catch(error => {
            console.error(error);
            alert(`Error: ${error.message}`);
        });
    });
}
        


