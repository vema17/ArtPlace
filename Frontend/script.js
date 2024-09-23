document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const email = document.getElementById('email');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
  
    let isValid = true;
  
    // Validar los campos
    if (!email.value) {
      email.classList.add('is-invalid');
      isValid = false;
    } else {
      email.classList.remove('is-invalid');
    }
  
    if (!firstName.value) {
      firstName.classList.add('is-invalid');
      isValid = false;
    } else {
      firstName.classList.remove('is-invalid');
    }
  
    if (!lastName.value) {
      lastName.classList.add('is-invalid');
      isValid = false;
    } else {
      lastName.classList.remove('is-invalid');
    }
  
    if (!username.value) {
      username.classList.add('is-invalid');
      isValid = false;
    } else {
      username.classList.remove('is-invalid');
    }
  
    if (!password.value || !validatePassword(password.value)) {
      password.classList.add('is-invalid');
      isValid = false;
    } else {
      password.classList.remove('is-invalid');
    }
  
    if (isValid) {
      // Aquí puedes añadir la lógica para enviar el formulario
      alert('Formulario de registro válido');
    }
  });
  
  function validatePassword(password) {
    const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRequirements.test(password);
  }
  
  document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
  
    let isValid = true;
  
    if (!loginEmail.value) {
      loginEmail.classList.add('is-invalid');
      isValid = false;
    } else {
      loginEmail.classList.remove('is-invalid');
    }
  
    if (!loginPassword.value) {
      loginPassword.classList.add('is-invalid');
      isValid = false;
    } else {
      loginPassword.classList.remove('is-invalid');
    }
  
    if (isValid) {
      // Aquí puedes añadir la lógica para iniciar sesión
      alert('Formulario de login válido');
    }
  });
  