// Función para mostrar el nombre del usuario
async function loadUser() {
    try {
        // Solicitar el nombre del usuario desde el consumidor
        const response = await fetch('api/products/current-user'); // Endpoint que expone getCurrentUserName
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const { nombre } = await response.json();

        // Actualiza el nombre del usuario en la página
        document.getElementById('username').textContent = nombre || 'Usuario';
    } catch (error) {
        console.error('Error al cargar el usuario:', error);
        document.getElementById('username').textContent = 'Usuario'; // Nombre predeterminado
    }
}

// Función para cargar la lista de productos desde la API
async function loadProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Limpiar la lista

    try {
        // Realiza una petición a la API para obtener los productos del usuario autenticado
        const response = await fetch('/api/products/my-products');
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const { products } = await response.json();

        if (products.length === 0) {
            productList.innerHTML = '<li>No tienes productos cargados.</li>';
            return;
        }

        products.forEach(product => {
            const productItem = document.createElement('li');
            productItem.classList.add('product-item');

            productItem.innerHTML = `
                <div class="product-info" onclick="viewProduct('${product._id}')">
                    <img src="${product.imagen}" alt="${product.nombre_obra}" class="product-image">
                    <div>
                        <div class="product-name">${product.nombre_obra}</div>
                        <div class="product-description">${product.descripcion}</div>
                    </div>
                </div>
                <div class="product-actions">
                    <button onclick="editProduct('${product._id}')">Editar</button>
                    <button class="delete" onclick="deleteProduct('${product._id}')">Eliminar</button>
                </div>
            `;

            productList.appendChild(productItem);
        });
    } catch (error) {
        console.error("Error al cargar los productos:", error);
        productList.innerHTML = '<li>Error al cargar los productos. Intenta nuevamente más tarde.</li>';
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
        fetch(`/api/products/delete/${id}`, {
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

document.addEventListener("DOMContentLoaded", () => {
    const navItems = [
      {
        selector: "a[href='home.html']",
        absoluteUrl: "http://localhost:3000/"
      },
      {
        selector: "a[href='manager_products.html']",
        absoluteUrl: "http://localhost:5001/manager_products.html"
      },
      {
        selector: "a[href='about.html']",
        absoluteUrl: "http://localhost:3000/about.html"
      },
      {
        selector: "a[href='contact.html']",
        absoluteUrl: "http://localhost:3000/contact.html"
      },
      {
        selector: "a[href='search_products.html']",
        absoluteUrl: "http://localhost:5001/"
      },
      {
        selector: "a[href='profile.html']",
        absoluteUrl: "http://localhost:5000/"
      }
    ];
  
    navItems.forEach(item => {
      const element = document.querySelector(item.selector);
      if (element) {
        element.addEventListener("click", (e) => {
          e.preventDefault(); // Evitar la navegación predeterminada
          window.location.href = item.absoluteUrl; // Redirigir a la URL absoluta
        });
      }
    });
  });
