// Obtener el ID del usuario de la URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id'); 

document.addEventListener("DOMContentLoaded", function() {

    // const userId = localStorage.getItem('userId'); // Recuperar el ID del usuario de localStorage

    // Array of link elements to modify
    const linksToUpdate = [
        { id: 'homeLink', href: `home.html?id=${userId}` },
        { id: 'perfilLink', href: `profile.html?id=${userId}` },
        { id: 'crearPerfilLink', href: `createProfile.html?id=${userId}` },
        { id: 'editarDireccionLink', href: `address.html?id=${userId}` },
        { id: 'cambiarContrasenaLink', href: `password.html?id=${userId}` },
        { id: 'catalogoLink', href: `home.html?id=${userId}` }
    ];

    // Update each link's href with userId
    linksToUpdate.forEach(linkInfo => {
        const linkElement = document.getElementById(linkInfo.id);
        if (linkElement) {
            linkElement.href = linkInfo.href;
        }
    });

    // Hacer la solicitud GET para obtener los datos de la dirección
    fetch(`/api/users/${userId}/direccion`, {  
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Si estás usando autenticación
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            throw new Error(data.error);
        }

        document.getElementById('estado').value = data.estado || '';
        document.getElementById('ciudad').value = data.ciudad || '';
        document.getElementById('codigoPostal').value = data.codigo_postal || '';
        document.getElementById('calle').value = data.calle || '';
        document.getElementById('numero').value = data.numero || '';
    })
    .catch(error => {
        alert(`Error al obtener la dirección: ${error.message}`);
    });

    // Hacer solicitud para obtener los datos de perfil
    fetch(`/api/users/${userId}/perfil`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                throw new Error(data.error || 'Error desconocido');
            });
        }
        return response.json();
    })
    .then(data => {
        // Obtener nombre de usuario
        document.getElementById('nombreUsuario').value = data.nombre_usuario || '';

        // Obtener bíografia 
        document.getElementById('bio').value = data.biografia || '';

        // Foto de perfil
        if (data.foto_perfil) {
            const ext = data.foto_perfil.split('.').pop();
            document.getElementById('profilePhoto').src = `/uploads/users/profile_${userId}.${ext}`;
        }
    })
    .catch(error => {
        console.error(error.message);
    });

    // Hacer solicitud para obtener teléfonos
    fetch(`/api/users/${userId}/contactos`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                throw new Error(data.error || 'Error desconocido');
            });
        }
        return response.json();
    })
    .then(data => {
        // Mostrar los teléfonos separados por comas
        const contactsInput = document.getElementById('contacts');
        const telefonos = data.map(contacto => contacto.Telefono);
        contactsInput.value = telefonos.join(', ') || ''; // Separar por comas
    })
    .catch(error => {
        console.error(error.message);
    });


    // Escuchar el evento submit del formulario
    const addressForm = document.getElementById('addressForm');
    if (addressForm) {
        addressForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita el envío del formulario por defecto

            // Actualizar perfil
            const nombreUsuario = document.getElementById('nombreUsuario').value; // Asegúrate de tener este input
            const biografia = document.getElementById('bio').value;
            const profilePhoto = document.getElementById('profileImageInput').files[0]; // Input tipo file


            const formData = new FormData();
            formData.append('nombre_usuario', nombreUsuario);
            formData.append('bio', biografia);
            if (profilePhoto) {
                formData.append('profileImageInput', profilePhoto);
            }

            fetch(`/api/users/${userId}/perfil`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData,
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => {
                        throw new Error(data.error || 'Error desconocido');
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log('Perfil actualizado:', data);
                alert('Perfil actualizado con éxito');
            })
            .catch(error => {
                console.error('Error al actualizar perfil:', error.message);
            });
            
            // Obtener los valores de los campos del formulario
            const calle = document.getElementById('calle').value;
            const numero = document.getElementById('numero').value;
            const ciudad = document.getElementById('ciudad').value;
            const estado = document.getElementById('estado').value;
            const codigo_postal = document.getElementById('codigoPostal').value;
            

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
            })
            .catch(error => {
                alert(`Error al actualizar la dirección: ${error.message}`);
            });
        });
    }
});
