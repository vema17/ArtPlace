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
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (!productId) {
        alert("Producto no encontrado.");
        return;
    }

    let selectedRating = 0; // Para almacenar la valoración seleccionada

    const fetchProductDetails = async (productId) => {
        try {
            const response = await axios.get(`/api/products/get/${productId}`);
            displayProductDetails(response.data);
        } catch (error) {
            document.getElementById('message').textContent = 'Error al cargar el producto: ' + error.message;
        }
    };

    const fetchComments = async (productId) => {
        try {
            const response = await axios.get(`http://localhost:3002/api/ratings/comments/${productId}`);
            displayComments(response.data);
        } catch (error) {
            document.getElementById('comment-message').textContent = 'Error al cargar los comentarios: ' + error.message;
        }
    };

    const postComment = async (productId, comment, score) => {
        try {
            await axios.post(`http://localhost:3002/api/ratings/agregar`, {
                productId,
                comment,
                score
            });
            document.getElementById('comment-message').textContent = 'Comentario enviado con éxito.';
            fetchComments(productId); // Recargar comentarios
        } catch (error) {
            document.getElementById('comment-message').textContent = 'Error al enviar el comentario: ' + error.message;
        }
    };

    const displayProductDetails = (product) => {
        document.getElementById('product-image').src = product.imagen;
        document.getElementById('product-name').textContent = product.nombre;
        document.getElementById('product-status').textContent = product.estado;
        document.getElementById('product-description').textContent = product.descripcion;
        document.getElementById('product-price').textContent = product.precio;
        document.getElementById('product-date').textContent = product.fecha_publicacion;

        const buyButton = document.getElementById('buy-button');
        buyButton.addEventListener('click', () => {
            window.location.href = "http://localhost:5002/";
        });
    };

    const displayComments = (comments) => {
        const commentsSection = document.getElementById('comments-section');
        commentsSection.innerHTML = ""; // Limpiar sección

        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('card', 'mb-3');
            commentDiv.innerHTML = `
                <div class="card-body">
                    <p class="card-text">${comment.comment}</p>
                    <p class="text-muted">Valoración: ${'★'.repeat(comment.score)}${'☆'.repeat(5 - comment.score)}</p>
                    <p class="text-muted">Publicado el ${new Date(comment.created_at).toLocaleDateString()}</p>
                </div>
            `;
            commentsSection.appendChild(commentDiv);
        });
    };

    // Manejar la selección de estrellas con radio buttons
    const ratingStars = document.querySelectorAll("#rating-stars input[type='radio']");
    ratingStars.forEach(star => {
        star.addEventListener("change", () => {
            selectedRating = parseInt(star.value);
        });
    });

    // Manejar el envío de comentarios
    const commentForm = document.getElementById('comment-form');
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const commentInput = document.getElementById('comment-input');
        if (selectedRating === 0) {
            document.getElementById('comment-message').textContent = 'Por favor selecciona una valoración.';
            return;
        }
        postComment(productId, commentInput.value, selectedRating);
        commentInput.value = ""; // Limpiar el campo
        selectedRating = 0; // Reiniciar la valoración
        // Desmarcar todos los radios
        ratingStars.forEach(radio => radio.checked = false);
    });

    navItems.forEach(item => {
        const element = document.querySelector(item.selector);
        if (element) {
          element.addEventListener("click", (e) => {
            e.preventDefault(); // Evitar la navegación predeterminada
            window.location.href = item.absoluteUrl; // Redirigir a la URL absoluta
          });
        }
    });

    fetchProductDetails(productId);
    fetchComments(productId);
});
