let currentPage = 1;
const resultsPerPage = 10; // Número de resultados por página

// Función para aplicar los filtros y mostrar los resultados
function applyFilters() {
    const query = document.getElementById('query').value;
    const categoria = document.getElementById('categoria').value;
    const precioMin = document.getElementById('precioMin').value;
    const precioMax = document.getElementById('precioMax').value;
    const artista = document.getElementById('artista').value;
    const tecnica = document.getElementById('tecnica').value;

    // Simulación de resultados de búsqueda
    const searchResults = [
        { titulo: "Cuadro Abstracto", descripcion: "Un hermoso cuadro abstracto", precio: 500, categoria: "Abstracto", artista: "Artista Ejemplo", tecnica: "Óleo" },
        // Agregar más ejemplos de cuadros aquí para probar la paginación
    ];

    displayResults(searchResults);
    updatePagination(searchResults.length);
}

// Función para mostrar los resultados en la página actual
function displayResults(results) {
    const searchResultsContainer = document.getElementById('searchResults');
    searchResultsContainer.innerHTML = "";

    // Calcula los resultados que se muestran en la página actual
    const start = (currentPage - 1) * resultsPerPage;
    const end = start + resultsPerPage;
    const paginatedResults = results.slice(start, end);

    // Muestra los resultados en la lista
    paginatedResults.forEach(result => {
        const li = document.createElement('li');
        li.innerHTML = `<h4>${result.titulo}</h4><p>${result.descripcion}</p><p><strong>Precio:</strong> $${result.precio}</p>`;
        searchResultsContainer.appendChild(li);
    });
}

// Funciones de Paginación
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

function updatePagination(totalResults) {
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    document.getElementById("pageInfo").textContent = `Página ${currentPage} de ${totalPages}`;
}
