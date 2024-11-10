document.addEventListener("DOMContentLoaded", () => {
    // Obtener el ID del producto desde la URL (ejemplo: ?id=123)
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    // Verificar si el ID del producto existe
    if (!productId) {
        alert("Producto no encontrado.");
        return;
    }

    // Función para obtener los detalles del producto desde la API
    const fetchProductDetails = async (productId) => {
        try {
            const response = await fetch(`/api/products/get/${productId}`);
            if (!response.ok) {
                throw new Error('Producto no encontrado');
            }

            const product = await response.json();
            displayProductDetails(product);
        } catch (error) {
            document.getElementById('message').textContent = 'Error al cargar el producto: ' + error.message;
        }
    };

    // Función para mostrar los detalles del producto en la página
    const displayProductDetails = (product) => {
        // Asignar los valores del producto al HTML
        document.getElementById('product-image').src = product.imagen;
        document.getElementById('product-name').textContent = product.nombre;
        document.getElementById('product-category').textContent = product.categoria;
        document.getElementById('product-description').textContent = product.descripcion;
        document.getElementById('product-price').textContent = product.precio;
        document.getElementById('product-rating').textContent = product.puntuacion;

        // Configurar el evento del botón de "Comprar"
        const buyButton = document.getElementById('buy-button');
        buyButton.addEventListener('click', () => {
            // Mostrar una alerta cuando se haga clic en el botón de "Comprar"
            alert("Función sin implementar");
        });
    };

    // Llamar a la función para obtener los detalles del producto
    fetchProductDetails(productId);
});
