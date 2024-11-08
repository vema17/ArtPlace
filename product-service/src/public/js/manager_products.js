// Función para mostrar el nombre del usuario
function loadUser() {
    document.getElementById('username').textContent = 'Nombre del Usuario'; // Reemplazar con el nombre real del usuario
}

// Función para cargar la lista de productos desde la API
async function loadProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Limpiar la lista

    try {
        // Realiza una petición a la API para obtener los productos
        const response = await fetch('/api/products');
        const products = await response.json();

        products.forEach(product => {
            const productItem = document.createElement('li');
            productItem.classList.add('product-item');

            productItem.innerHTML = `
                <div class="product-info" onclick="viewProduct(${product.id})">
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
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
}

// Función para agregar un nuevo producto
function addProduct() {
    // Redirigir a la página para agregar un nuevo producto
    window.location.href = '/create_product.html';
}

// Función para editar un producto
function editProduct(id) {
    // Redirigir a la página de edición de producto con el ID del producto
    window.location.href = `/edit_product.html?id=${id}`;
}

// Función para eliminar un producto
function deleteProduct(id) {
    const confirmed = confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (confirmed) {
        // Aquí puedes hacer una solicitud al backend para eliminar el producto
        console.log(`Producto con ID ${id} eliminado`);
        // Actualizar la lista local de productos
        // Realiza una petición a la API para eliminar el producto
        fetch(`/api/products/${id}`, {
            method: 'DELETE',
        }).then(() => {
            loadProducts(); // Recargar la lista de productos
        }).catch((error) => {
            console.error("Error al eliminar el producto:", error);
        });
    }
}

// Función para redirigir a la página de visualización de producto
function viewProduct(id) {
    // Redirigir a la página de visualización del producto con el ID del producto
    window.location.href = `/view_product.html?id=${id}`;
}

// Inicializar la página cargando el usuario y los productos
window.onload = function() {
    loadUser();
    loadProducts();
};
