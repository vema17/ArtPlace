/*let currentPage = 1;
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

const applyFilters = async () => {
    const searchQuery = document.getElementById('searchQuery').value || '';
    const categoria = document.querySelector("input[name='categoria']:checked")?.value || '';
    const tecnica = document.querySelector("input[name='tecnica']:checked")?.value || '';
    const estilo = document.querySelector("input[name='estilo']:checked")?.value || '';
    const priceMin = document.getElementById('precioMin').value || 0;
    const alturaMin = document.getElementById('alturaMin').value || '';
    const alturaMax = document.getElementById('alturaMax').value || '';
    const anchuraMin = document.getElementById('anchuraMin').value || '';
    const anchuraMax = document.getElementById('anchuraMax').value || '';
  
    let url = `/api/products/filtered?query=${encodeURIComponent(searchQuery)}&priceMin=${priceMin}&page=${currentPage}&limit=${resultsPerPage}`;
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
        updatePagination(data.totalResults);
    } catch (error) {
        console.error("Error al aplicar filtros:", error);
    }
};

const displayResults = (products) => {
  const container = document.getElementById('searchResults');
  container.innerHTML = '';
  products.forEach(product => {
    const item = document.createElement('div');
    item.innerHTML = `
      <img src="${product.imagen}" alt="${product.nombre_obra}" />
      <h4>${product.nombre_obra}</h4>
      <p>Artista: ${product.artista}</p>
      <p>Precio: $${product.precio}</p>
    `;
    container.appendChild(item);
  });
};

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
window.onload = loadAllProducts; */

let currentPage = 1;
const resultsPerPage = 10;


const applyFilters = async () => {
  const searchQuery = document.getElementById('searchQuery').value || '';
  const categoria = document.getElementById("categoria").value || '';
  const estilo = document.getElementById("estilo").value || '';
  const tecnica = document.getElementById("tecnica").value || '';
  const priceMin = document.getElementById('precioMin').value || 0;
  const alturaMin = document.getElementById('alturaMin').value || '';
  const alturaMax = document.getElementById('alturaMax').value || '';
  const anchuraMin = document.getElementById('anchuraMin').value || '';
  const anchuraMax = document.getElementById('anchuraMax').value || '';
  const orderBy = document.getElementById('orderBy').value || '';

  let url = `/api/products/filtered?query=${searchQuery ? encodeURIComponent(searchQuery) : ''}`;
  if (priceMin) url += `&priceMin=${encodeURIComponent(priceMin)}`;
  if (currentPage) url += `&page=${encodeURIComponent(currentPage)}`;
  if (resultsPerPage) url += `&limit=${encodeURIComponent(resultsPerPage)}`;
  if (categoria) url += `&categoria=${encodeURIComponent(categoria)}`;
  if (tecnica) url += `&tecnica=${encodeURIComponent(tecnica)}`;
  if (estilo) url += `&estilo=${encodeURIComponent(estilo)}`;
  if (alturaMin) url += `&alturaMin=${encodeURIComponent(alturaMin)}`;
  if (alturaMax) url += `&alturaMax=${encodeURIComponent(alturaMax)}`;
  if (anchuraMin) url += `&anchuraMin=${encodeURIComponent(anchuraMin)}`;
  if (anchuraMax) url += `&anchuraMax=${encodeURIComponent(anchuraMax)}`;
  if (orderBy) url += `&orderBy=${encodeURIComponent(orderBy)}`;

  // Actualiza los parámetros de la URL
  const urlParams = new URLSearchParams({
    query: searchQuery,
    categoria,
    tecnica,
    estilo,
    priceMin,
    alturaMin,
    alturaMax,
    anchuraMin,
    anchuraMax,
    orderBy,
    page: currentPage
  });
  history.pushState(null, '', `?${urlParams.toString()}`);

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const data = await response.json();
    displayResults(data.products);
    updatePagination(data.totalResults);
  } catch (error) {
    console.error("Error al aplicar filtros:", error);
  }
};


async function loadAllProducts() {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('query') || '';
  const categoria = urlParams.get('categoria') || '';
  const tecnica = urlParams.get('tecnica') || '';
  const estilo = urlParams.get('estilo') || '';
  const priceMin = urlParams.get('priceMin') || 0;
  const alturaMin = urlParams.get('alturaMin') || '';
  const alturaMax = urlParams.get('alturaMax') || '';
  const anchuraMin = urlParams.get('anchuraMin') || '';
  const anchuraMax = urlParams.get('anchuraMax') || '';
  currentPage = parseInt(urlParams.get('page')) || 1;

  // Si hay parámetros de filtros, llama a applyFilters
  if (query || categoria || tecnica || estilo || priceMin || alturaMin || alturaMax || anchuraMin || anchuraMax) {
    applyFilters();
  } else {
    try {
      const response = await fetch('/api/products/all');
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      const data = await response.json();
      displayResults(data.products);
      updatePagination(data.totalResults);
    } catch (error) {
      console.error("Error al cargar los productos:", error);
    }
  }
}

const displayResults = (products) => {
  const container = document.getElementById('searchResults');
  container.innerHTML = '';  // Limpiar el contenedor antes de agregar nuevos productos
  
  products.forEach(product => {
    const item = document.createElement('div');
    item.classList.add('product-item');  // Puedes agregar una clase para estilos, si lo deseas

    item.innerHTML = `
      <img src="${product.imagen}" alt="${product.nombre_obra}" />
      <h4>${product.nombre_obra}</h4>
      <p>Artista: ${product.artista}</p>
      <p>Precio: $${product.precio}</p>
    `;
    
    // Agregar el listener de clic
    item.addEventListener('click', () => {
      // Redirigir a 'view_product.html' con el id del producto en la URL
      window.location.href = `view_product.html?id=${product._id}`; 
    });

    container.appendChild(item);
  });
};


function updatePagination(totalResults) {
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  document.getElementById("pageInfo").textContent = `Página ${currentPage} de ${totalPages}`;

  document.getElementById("prevPage").disabled = currentPage === 1;
  document.getElementById("nextPage").disabled = currentPage === totalPages;
}


function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    applyFilters(); // Actualiza los filtros con la nueva página
  }
}

function nextPage() {
  currentPage++;
  applyFilters(); // Actualiza los filtros con la nueva página
}


// Cargar productos iniciales
window.onload = applyFilters;


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