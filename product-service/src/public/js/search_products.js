let currentPage = 1;
const resultsPerPage = 10; // Número de productos por página

// Función para cargar todos los productos al iniciar la página
async function loadAllProducts() {
    currentPage = 1;
    try {
        console.log("Cargando todos los productos...");
        const response = await fetch(`/api/products?page=${currentPage}&limit=${resultsPerPage}`);
        
        if (!response || !response.ok) throw new Error(`Error de respuesta del servidor: ${response.status}`);

        const data = await response.json();
        console.log("Datos recibidos:", data);

        if (data && data.products) {
            displayResults(data.products);
            updatePagination(data.totalProducts);
        } else {
            displayResults([]);
        }
    } catch (error) {
        console.error("Error al cargar todos los productos:", error);
        displayResults([]);
    }
}

// Función para aplicar filtros y obtener resultados
async function applyFilters() {
    // Recoge los valores de los filtros del DOM
    const query = document.getElementById('query').value || '';
    const categoria = document.getElementById('categoria').value || '';
    const precioMin = document.getElementById('precioMin').value || '';
    const precioMax = document.getElementById('precioMax').value || '';
    const artista = document.getElementById('artista').value || '';
    const tecnica = document.getElementById('tecnica').value || '';

    // Construye los parámetros de la URL solo con filtros que tienen valor
    const url = new URL('/api/products', window.location.origin);
    url.searchParams.append('page', currentPage);
    url.searchParams.append('limit', resultsPerPage);
    if (query) url.searchParams.append('query', query);
    if (categoria) url.searchParams.append('categoria', categoria);
    if (precioMin) url.searchParams.append('precioMin', precioMin);
    if (precioMax) url.searchParams.append('precioMax', precioMax);
    if (artista) url.searchParams.append('artista', artista);
    if (tecnica) url.searchParams.append('tecnica', tecnica);

    try {
        console.log("Aplicando filtros con URL:", url.toString());
        const response = await fetch(url);

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        console.log("Datos recibidos con filtros:", data);

        if (data && data.products) {
            displayResults(data.products);
            updatePagination(data.totalProducts);
        } else {
            displayResults([]);
        }
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        displayResults([]);
    }
}


// Función para mostrar los resultados en formato de cuadrícula
function displayResults(results) {
    const searchResultsContainer = document.getElementById('searchResults');
    searchResultsContainer.innerHTML = "";

    if (results.length === 0) {
        searchResultsContainer.innerHTML = "<li>No se encontraron productos.</li>";
        return;
    }

    results.forEach(result => {
        const li = document.createElement('li');
        li.classList.add("product-item");

        li.innerHTML = `
            <img src="${result.imagen}" alt="${result.nombre_obra}" class="product-image">
            <div class="product-details">
                <h4>${result.nombre_obra}</h4>
                <p><strong>Artista:</strong> ${result.artista}</p>
                <p><strong>Precio:</strong> $${result.precio}</p>
                <p><strong>Dimensiones:</strong> ${result.dimensiones.altura} cm x ${result.dimensiones.anchura} cm</p>
                <button onclick="window.location.href='/product/${result._id}'" class="view-button">Ver Detalles</button>
            </div>
        `;
        searchResultsContainer.appendChild(li);
    });
}

// Función para actualizar la información de paginación
function updatePagination(totalResults) {
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    document.getElementById("pageInfo").textContent = `Página ${currentPage} de ${totalPages}`;

    document.querySelector(".pagination button:nth-child(1)").disabled = currentPage === 1;
    document.querySelector(".pagination button:nth-child(3)").disabled = currentPage === totalPages;
}

// Funciones para manejar la paginación
function nextPage() {
    currentPage++;
    applyFilters();
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        applyFilters();
    }
}
