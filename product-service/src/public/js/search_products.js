let currentPage = 1;
const resultsPerPage = 10; // Número de productos por página

// Función para cargar todos los productos al iniciar la página
async function loadAllProducts() {
    currentPage = 1;
    try {
        const response = await fetch(`/api/products?page=${currentPage}&limit=${resultsPerPage}`);
        
        if (!response || !response.ok) throw new Error(`Error de respuesta del servidor`);

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
    const query = document.getElementById('query').value || '';
    const categoria = document.getElementById('categoria').value || '';
    const precioMin = document.getElementById('precioMin').value || '';
    const precioMax = document.getElementById('precioMax').value || '';
    const artista = document.getElementById('artista').value || '';
    const tecnica = document.getElementById('tecnica').value || '';

    try {
        const response = await fetch(`/api/products?query=${encodeURIComponent(query)}&categoria=${encodeURIComponent(categoria)}&precioMin=${encodeURIComponent(precioMin)}&precioMax=${encodeURIComponent(precioMax)}&artista=${encodeURIComponent(artista)}&tecnica=${encodeURIComponent(tecnica)}&page=${currentPage}&limit=${resultsPerPage}`);

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
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

// Función para mostrar los resultados en el DOM
function displayResults(results) {
    const searchResultsContainer = document.getElementById('searchResults');
    searchResultsContainer.innerHTML = "";

    if (results.length === 0) {
        searchResultsContainer.innerHTML = "<li>No se encontraron productos.</li>";
        return;
    }

    results.forEach(result => {
        const li = document.createElement('li');
        li.innerHTML = `
            <h4>${result.nombre_obra}</h4>
            <p>${result.descripcion}</p>
            <p><strong>Precio:</strong> $${result.precio}</p>
            <p><strong>Artista:</strong> ${result.artista}</p>`;
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
