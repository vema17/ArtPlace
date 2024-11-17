let productToEdit = null; // Variable para almacenar los datos del producto a editar

// Opciones predeterminadas para los select
const categorias = [
    "Abstracción", "Paisajismo", "Naturaleza", "Retrato", "Cultura Pop", "Animales", "Autorretrato",
    "Bodegón", "Conceptual", "Desnudo", "Era Digital", "Escena De Género", "Fantasía", "Fashion",
    "Historia y Política", "Marina", "Provocativo", "Religión", "Street Art", "Urbano", "Vanitas"
];

const estilos = [
    "Abstracto", "Aborigen", "Arte Marginal", "Cubismo", "Clásico", "Expresionismo", "Fauvismo", 
    "Figurativo", "Futurista", "Geométrico", "Historietas", "Impresionismo", "Metafísico", "Minimalismo",
    "Naif", "Oriental", "Otro", "Pop Art", "Primitivismo", "Realismo", "Semiabstracto", "Simbólico"
];

const tecnicas = [
    "Acrílico", "Acuarela", "Algodón", "Alquitrán", "Arena", "Bordado", "Carbón", "Cemento", "Cera", 
    "Cerámica", "Cinta", "Collage", "Dorados", "Esmalte", "Fieltro", "Gouache/Aguada", "Grabado", "Graffiti", 
    "Grafito", "Hoja de Plata", "Laca", "Ladrillos", "Lana", "Lápiz", "Lápiz de Color", "Látex", "Litografía", 
    "Material Orgánico", "Objetos", "Objetos Recuperados", "Pan de Oro", "Pantalla", "Pastel", 
    "Pastel al Óleo", "Perlas", "Piel", "Pigmento", "Pintura en Relieve", "Pirofusión", "Pluma", 
    "Polvo de Mármol", "Resina", "Resina Epoxi", "Serigrafía", "Témpera", "Tierra", "Tinta China", 
    "Tinte", "Tiza", "Vinilo", "Yeso", "Zinc"
];


// Cargar datos del producto para editar
async function loadProductData() {
    const messageElement = document.getElementById('message');
    const productId = new URLSearchParams(window.location.search).get('id'); // Obtener el ID del producto de la URL

    if (!productId) {
        messageElement.textContent = "ID del producto no especificado.";
        messageElement.style.color = "red";
        return;
    }

    try {
        // Solicitar datos del producto desde el backend
        const response = await fetch(`/api/products/get/${productId}`);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const productToEdit = await response.json();

        // Rellenar los campos del formulario con los datos del producto
        document.getElementById('nombre_obra').value = productToEdit?.nombre_obra || '';
        document.getElementById('descripcion').value = productToEdit?.descripcion || '';
        document.getElementById('altura').value = productToEdit?.dimensiones?.altura || '';
        document.getElementById('anchura').value = productToEdit?.dimensiones?.anchura || '';
        document.getElementById('precio').value = productToEdit?.precio || '';

        // Seleccionar las opciones correctas en los selects
        setSelectedOption('categoria', productToEdit?.etiquetas?.categoria);
        setSelectedOption('estilo', productToEdit?.etiquetas?.estilos);
        setSelectedOption('tecnica', productToEdit?.etiquetas?.tecnica);
    } catch (error) {
        messageElement.textContent = `Error al cargar los datos del producto: ${error.message}`;
        messageElement.style.color = "red";
    }
}

// Función para seleccionar la opción correcta en un select
function setSelectedOption(selectId, value) {
    const select = document.getElementById(selectId);
    if (select) {
        const options = select.options;
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === value) {
                options[i].selected = true;
                break;
            }
        }
    }
}

// Función para validar y enviar el formulario de edición
async function submitEditForm() {
    const form = document.getElementById('editProductForm');
    const messageElement = document.getElementById('message');
    const productId = new URLSearchParams(window.location.search).get('id'); // Obtener el ID del producto de la URL

    if (!productId) {
        messageElement.textContent = "ID del producto no especificado.";
        messageElement.style.color = "red";
        return;
    }

    try {
        const formData = new FormData(form); // Crear un FormData para manejar los datos del formulario

        // Enviar los datos al backend para actualizar el producto
        const response = await fetch(`/api/products/update/${productId}`, {
            method: 'PUT',
            body: formData,
        });

        if (response.ok) {
            messageElement.textContent = "Cuadro actualizado exitosamente.";
            messageElement.style.color = "green";
        } else {
            throw new Error("Error al actualizar el cuadro.");
        }
    } catch (error) {
        messageElement.textContent = error.message;
        messageElement.style.color = "red";
    }
}

// Cargar los datos del producto al cargar la página
document.addEventListener('DOMContentLoaded', loadProductData);

