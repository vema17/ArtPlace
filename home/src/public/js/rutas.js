document.addEventListener("DOMContentLoaded", () => {
    const navItems = [
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
  