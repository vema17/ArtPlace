// Lista de países
const countries = [
    "Afganistán", "Albania", "Alemania", "Andorra", "Angola", "Antigua y Barbuda", "Arabia Saudita", 
    "Argelia", "Argentina", "Armenia", "Australia", "Austria", "Azerbaiyán", "Bahamas", "Bangladés", 
    "Barbados", "Baréin", "Bélgica", "Belice", "Benín", "Bielorrusia", "Birmania", "Bolivia", "Bosnia y Herzegovina", 
    "Botsuana", "Brasil", "Brunéi", "Bulgaria", "Burkina Faso", "Burundi", "Bután", "Cabo Verde", 
    "Camboya", "Camerún", "Canadá", "Catar", "Chad", "Chile", "China", "Chipre", "Ciudad del Vaticano", 
    "Colombia", "Comoras", "Corea del Norte", "Corea del Sur", "Costa de Marfil", "Costa Rica", "Croacia", 
    "Cuba", "Dinamarca", "Dominica", "Ecuador", "Egipto", "El Salvador", "Emiratos Árabes Unidos", 
    "Eritrea", "Eslovaquia", "Eslovenia", "España", "Estados Unidos", "Estonia", "Esuatini", "Etiopía", 
    "Filipinas", "Finlandia", "Fiyi", "Francia", "Gabón", "Gambia", "Georgia", "Ghana", "Granada", 
    "Grecia", "Guatemala", "Guyana", "Guinea", "Guinea-Bisáu", "Guinea Ecuatorial", "Haití", "Honduras", 
    "Hungría", "India", "Indonesia", "Irak", "Irán", "Irlanda", "Islandia", "Islas Marshall", "Islas Salomón", 
    "Israel", "Italia", "Jamaica", "Japón", "Jordania", "Kazajistán", "Kenia", "Kirguistán", "Kiribati", 
    "Kosovo", "Kuwait", "Laos", "Lesoto", "Letonia", "Líbano", "Liberia", "Libia", "Liechtenstein", 
    "Lituania", "Luxemburgo", "Madagascar", "Malasia", "Malaui", "Maldivas", "Malí", "Malta", "Marruecos", 
    "Mauricio", "Mauritania", "México", "Micronesia", "Moldavia", "Mónaco", "Mongolia", "Montenegro", 
    "Mozambique", "Namibia", "Nauru", "Nepal", "Nicaragua", "Níger", "Nigeria", "Noruega", "Nueva Zelanda", 
    "Omán", "Países Bajos", "Pakistán", "Palaos", "Palestina", "Panamá", "Papúa Nueva Guinea", "Paraguay", 
    "Perú", "Polonia", "Portugal", "Reino Unido", "República Centroafricana", "República Checa", 
    "República del Congo", "República Democrática del Congo", "República Dominicana", "Ruanda", 
    "Rumania", "Rusia", "Samoa", "San Cristóbal y Nieves", "San Marino", "San Vicente y las Granadinas", 
    "Santa Lucía", "Santo Tomé y Príncipe", "Senegal", "Serbia", "Seychelles", "Sierra Leona", "Singapur", 
    "Siria", "Somalia", "Sri Lanka", "Sudáfrica", "Sudán", "Sudán del Sur", "Suecia", "Suiza", "Surinam", 
    "Tailandia", "Tanzania", "Tayikistán", "Timor Oriental", "Togo", "Tonga", "Trinidad y Tobago", 
    "Túnez", "Turkmenistán", "Turquía", "Tuvalu", "Ucrania", "Uganda", "Uruguay", "Uzbekistán", 
    "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Yibuti", "Zambia", "Zimbabue"
];

paypal.Buttons({
    // Configurar las transacciones
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: '100.00' // Cambia esto al valor total del pedido
                },
                description: "Compra de productos en tu tienda" // Descripción opcional
            }]
        });
    },
    // Manejar la aprobación del pago
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            // Mostrar un mensaje al usuario o redirigirlo
            alert('Pago realizado con éxito por ' + details.payer.name.given_name);
            console.log('Detalles de la transacción:', details);
        });
    },
    // Manejar errores en el proceso de pago
    onError: function(err) {
        console.error('Error durante el pago:', err);
        alert('Hubo un problema con el pago. Inténtalo nuevamente.');
    }
}).render('#paypal-button-container'); // Renderizar el botón en el contenedor

// Simulación de datos del producto (obtenido desde otro microservicio)
const product = {
    name: "Young Leonardo Da Vinci",
    description: "VAVA VENEZIA DELLERT - 2023",
    price: 3350,
    currency: "USD",
    image: "https://via.placeholder.com/80"
};


// Llenar el select con los países
function loadCountries() {
    const countrySelect = document.getElementById('country');
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });
};

// Cambiar entre pasos
function nextStep(stepNumber) {
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => step.classList.add('hidden'));
    document.getElementById(`step${stepNumber}`).classList.remove('hidden');

    // Cargar resumen del pedido en el paso 3
    if (stepNumber === 3) {
        loadOrderSummary();
    }
};


// Cargar datos del producto en el resumen del pedido
function loadOrderSummary() {
    const orderItem = document.getElementById('order-item');
    const priceSummary = document.getElementById('price-summary');

    // Limpiar contenido previo
    orderItem.innerHTML = "";
    priceSummary.innerHTML = "";

    // Mostrar producto
    orderItem.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div>
            <p><strong>${product.name}</strong></p>
            <p>${product.description}</p>
        </div>
    `;

    // Mostrar precio
    priceSummary.innerHTML = `
        <p>Precio: ${product.currency} ${product.price}</p>
        <p>Costos de envío: Incluidos</p>
        <p><strong>Total: ${product.currency} ${product.price}</strong></p>
    `;
};

// Cargar países al inicio
document.addEventListener('DOMContentLoaded', loadCountries);