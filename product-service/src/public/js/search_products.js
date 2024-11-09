let currentPage = 1;
const resultsPerPage = 10;

async function loadAllProducts() {
    try {
        const response = await fetch('/api/products/all'); // Ruta para obtener todos los productos
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        const data = await response.json();
        displayResults(data.products); // Muestra todos los productos al inicio
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
}
// Función para aplicar filtros y obtener resultados
async function applyFilters() {
    const searchQuery = document.getElementById('searchQuery').value || '';
    const categoria = document.querySelector("input[name='categoria']:checked")?.value || '';
    const tecnica = document.querySelector("input[name='tecnica']:checked")?.value || '';
    const estilo = document.querySelector("input[name='estilo']:checked")?.value || '';
    const precioMin = document.getElementById('precioMin').value || 0;
    const alturaMin = document.getElementById('alturaMin').value || '';
    const alturaMax = document.getElementById('alturaMax').value || '';
    const anchuraMin = document.getElementById('anchuraMin').value || '';
    const anchuraMax = document.getElementById('anchuraMax').value || '';

    // Construcción de la URL de la solicitud
    let url = `/api/products/filtered?query=${encodeURIComponent(searchQuery)}&priceMin=${precioMin}`;
    if (categoria) url += `&categoria=${encodeURIComponent(categoria)}`;
    if (tecnica) url += `&tecnica=${encodeURIComponent(tecnica)}`;
    if (estilo) url += `&estilo=${encodeURIComponent(estilo)}`;
    if (alturaMin) url += `&alturaMin=${encodeURIComponent(alturaMin)}`;
    if (alturaMax) url += `&alturaMax=${encodeURIComponent(alturaMax)}`;
    if (anchuraMin) url += `&anchuraMin=${encodeURIComponent(anchuraMin)}`;
    if (anchuraMax) url += `&anchuraMax=${encodeURIComponent(anchuraMax)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        const data = await response.json();
        displayResults(data.products);
        updatePagination(data.totalProducts);
    } catch (error) {
        console.error("Error al aplicar filtros:", error);
    }
}

// Función para mostrar los productos en la página
function displayResults(products) {
    const searchResultsContainer = document.getElementById('searchResults');
    searchResultsContainer.innerHTML = '';

    if (products.length === 0) {
        searchResultsContainer.innerHTML = "<p>No se encontraron productos.</p>";
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-item');

        productCard.innerHTML = `
            <img src="${product.imagen}" alt="${product.nombre_obra}">
            <h4>${product.nombre_obra}</h4>
            <p><strong>Artista:</strong> ${product.artista}</p>
            <p><strong>Precio:</strong> $${product.precio}</p>
            <button class="view-button" onclick="window.location.href='/product/${product._id}'">Ver Detalles</button>
        `;

        searchResultsContainer.appendChild(productCard);
    });
}

// Actualizar la paginación
function updatePagination(totalResults) {
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    document.getElementById("pageInfo").textContent = `Página ${currentPage} de ${totalPages}`;

    document.getElementById("prevPage").disabled = currentPage === 1;
    document.getElementById("nextPage").disabled = currentPage === totalPages;
}

// Función para la página anterior
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        applyFilters();
    }
}

// Función para la página siguiente
function nextPage() {
    currentPage++;
    applyFilters();
}

// Cargar productos iniciales
window.onload = applyFilters;
