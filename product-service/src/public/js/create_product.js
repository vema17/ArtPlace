function submitForm() {
    const form = document.getElementById('addProductForm');
    const messageElement = document.getElementById('message');
  
    const token = localStorage.getItem('authToken');
    if (!token) {
      messageElement.textContent = "Por favor, inicia sesión.";
      messageElement.style.color = "red";
      return;
    }
  
    const formData = new FormData(form);
  
    fetch('/api/products/agregar', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.ok) {
        messageElement.textContent = "Cuadro agregado exitosamente.";
        messageElement.style.color = "green";
        form.reset();
      } else {
        throw new Error("Error al agregar el cuadro.");
      }
    })
    .catch(error => {
      messageElement.textContent = error.message;
      messageElement.style.color = "red";
    });
  }
  