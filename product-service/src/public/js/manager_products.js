// Simulación de datos de ejemplo 
const user = { name: 'Artista Ejemplo' };
const products = [
    { id: 1, nombre: 'Cuadro 1', imagen: 'https://via.placeholder.com/80', descripcion: 'Descripción del cuadro 1' },
    { id: 2, nombre: 'Cuadro 2', imagen: 'https://via.placeholder.com/80', descripcion: 'Descripción del cuadro 2' }
];

// Función para mostrar el nombre del usuario
function loadUser() {
    document.getElementById('username').textContent = user.name;
}

// Función para cargar la lista de productos
function loadProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Limpiar la lista

    products.forEach(product => {
        const productItem = document.createElement('li');
        productItem.classList.add('product-item');

        productItem.innerHTML = `
            <div class="product-info">
                <img src="${product.imagen}" alt="${product.nombre}" class="product-image">
                <div>
                    <div class="product-name">${product.nombre}</div>
                    <div class="product-description">${product.descripcion}</div>
                </div>
            </div>
            <div class="product-actions">
                <button onclick="editProduct(${product.id})">Editar</button>
                <button class="delete" onclick="deleteProduct(${product.id})">Eliminar</button>
            </div>
        `;

        productList.appendChild(productItem);
    });
}

// Función para agregar un nuevo producto
function addProduct() {
    // Redirigir a la página para agregar un nuevo producto
    window.location.href = 'create_product.html';
}

// Función para editar un producto
function editProduct(id) {
    // Redirigir a la página de edición de producto con el ID del producto
    window.location.href = `/editar-cuadro.html?id=${id}`;
}

// Función para eliminar un producto
function deleteProduct(id) {
    const confirmed = confirm("¿Estás seguro de que deseas eliminar este cuadro?");
    if (confirmed) {
        // Aquí puedes hacer una solicitud al backend para eliminar el producto
        console.log(`Producto con ID ${id} eliminado`);
        // Actualizar la lista local de productos
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            products.splice(index, 1);
            loadProducts(); // Recargar la lista de productos
        }
    }
}

// Inicializar la página cargando el usuario y los productos
loadUser();
loadProducts();