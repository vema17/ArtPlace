// Obtener el ID del usuario desde la URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');
document.getElementById('userId').value = userId;

document.getElementById('createProfileForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre_usuario = document.getElementById('nombre_usuario').value;
    const bio = document.getElementById('bio').value;
    const profileImageInput = document.getElementById('profileImageInput').files[0]; // Manejo de archivo puede ser necesario
    const street = document.getElementById('street').value;
    const streetNumber = document.getElementById('streetNumber').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const postalCode = document.getElementById('postalCode').value;
    const country = document.getElementById('country').value;

    // Crear objeto para enviar al servidor
    const profileData = {
        nombre_usuario,
        bio,
        profileImage: profileImageInput ? profileImageInput.name : null, // O manejar la carga del archivo
        address: {
            street,
            number: streetNumber,
            city,
            state,
            postalCode,
            country
        }
    };

    // Enviar datos al backend
    fetch(`/api/users/${userId}/perfil`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al crear el perfil');
        }
        return response.json();
    })
    .then(data => {
        alert(data.message);
        // Redirigir o actualizar la interfaz de usuario según sea necesario
    })
    .catch(error => {
        console.error(error);
        alert('Error al crear el perfil');
    });
});