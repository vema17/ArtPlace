document.getElementById('createProfileForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre_usuario = document.getElementById('nombre_usuario').value;
    const bio = document.getElementById('bio').value;
    const profileImageInput = document.getElementById('profileImageInput').files[0]; // Obtener el archivo
    const street = document.getElementById('street').value;
    const streetNumber = document.getElementById('streetNumber').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const postalCode = document.getElementById('postalCode').value;
    const country = document.getElementById('country').value;
    const socialMedia = document.getElementById('socialMedia').value.split(',').map(url => url.trim()); // Separar URLs de redes sociales
    const contacts = document.getElementById('contacts').value.split(',').map(phone => phone.trim()); // Separar números de contacto

    // Crear un objeto FormData para enviar los datos, incluyendo el archivo
    const formData = new FormData();
    formData.append('nombre_usuario', nombre_usuario);
    formData.append('bio', bio);
    if (profileImageInput) {
        formData.append('profileImageInput', profileImageInput);
    }
    formData.append('street', street);
    formData.append('streetNumber', streetNumber);
    formData.append('city', city);
    formData.append('state', state);
    formData.append('postalCode', postalCode);
    formData.append('country', country);
    formData.append('socialMedia', JSON.stringify(socialMedia)); // Enviar redes sociales como JSON
    formData.append('contacts', JSON.stringify(contacts)); // Enviar contactos como JSON

    // Obtener el ID del usuario desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');

    // Enviar datos al backend
    fetch(`/api/users/${userId}/perfil`, {
        method: 'POST',
        body: formData, // Cambiar a FormData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al crear el perfil');
        }
        return response.json();
    })
    .then(data => {
        alert(data.message);
        window.location.href = `profile.html?id=${userId}`;
    })
    .catch(error => {
        console.error(error);
        alert('Error al crear el perfil');
    });
});
