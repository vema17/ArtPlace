// Simulación de datos de productos (estos datos deberían obtenerse del backend en una aplicación real)
const products = [
    { id: 1, nombre: 'Cuadro Abstracto', categoria: 'abstracto', precio: 200, artista: 'Artista 1', tecnica: 'oleo' },
    { id: 2, nombre: 'Paisaje Natural', categoria: 'paisaje', precio: 500, artista: 'Artista 2', tecnica: 'acrilico' },
    { id: 3, nombre: 'Retrato', categoria: 'retrato', precio: 300, artista: 'Artista 3', tecnica: 'acuarela' },
    { id: 4, nombre: 'Cuadro Realista', categoria: 'realismo', precio: 700, artista: 'Artista 4', tecnica: 'carboncillo' }
];

// Función para aplicar los filtros de búsqueda
function applyFilters() {
    const query = document.getElementById('query').value.toLowerCase();
    const categoria = document.getElementById('categoria').value;
    const precioMin = document.getElementById('precioMin').value ? parseFloat(document.getElementById('precioMin').value) : 0;
    const precioMax = document.getElementById('precioMax').value ? parseFloat(document.getElementById('precioMax').value) : Infinity;
    const artista = document.getElementById('artista').value.toLowerCase();
    const tecnica = document.getElementById('tecnica').value;

    // Filtrar los productos en base a los criterios seleccionados
    const filteredProducts = products.filter(product => {
        const matchesQuery = product.nombre.toLowerCase().includes(query) || product.descripcion?.toLowerCase().includes(query);
        const matchesCategoria = !categoria || product.categoria === categoria;
        const matchesPrecio = product.precio >= precioMin && product.precio <= precioMax;
        const matchesArtista = !artista || product.artista.toLowerCase().includes(artista);
        const matchesTecnica = !tecnica || product.tecnica === tecnica;

        return matchesQuery && matchesCategoria && matchesPrecio && matchesArtista && matchesTecnica;
    });

    displayResults(filteredProducts);
}

// Función para mostrar los resultados de la búsqueda
function displayResults(results) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = ''; // Limpiar resultados anteriores

    if (results.length === 0) {
        resultsContainer.innerHTML = '<li>No se encontraron resultados.</li>';
        return;
    }

    results.forEach(product => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${product.nombre}</strong><br>
            Categoría: ${product.categoria}<br>
            Precio: $${product.precio}<br>
            Artista: ${product.artista}<br>
            Técnica: ${product.tecnica}
        `;
        resultsContainer.appendChild(listItem);
    });
}