document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. ALTERNAR VISIBILIDAD DE CONTRASEÑA
  // ==========================================
  const toggleBtns = document.querySelectorAll('.toggle-pwd, #toggle-pwd');

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      
      if (input && (input.type === 'password' || input.type === 'text')) {
        if (input.type === 'password') {
          input.type = 'text';
          btn.textContent = '🙈';
        } else {
          input.type = 'password';
          btn.textContent = '👁️';
        }
      }
    });
  });

  // ==========================================
  // 2. REGISTRO DE USUARIOS (register.html)
  // ==========================================
  const registerForm = document.getElementById('register-form');

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('reg-fullname').value.trim();
      const username = document.getElementById('reg-username').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const password = document.getElementById('reg-password').value;
      const confirmPassword = document.getElementById('reg-confirm-password').value;
      const captchaChecked = document.getElementById('captcha-check').checked;
      const termsChecked = document.getElementById('terms-check').checked;

      // Validaciones
      if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
      }

      if (!captchaChecked) {
        alert('Por favor, confirma que no eres un robot.');
        return;
      }

      if (!termsChecked) {
        alert('Debes aceptar los Términos y Condiciones.');
        return;
      }

      // Obtener usuarios existentes de localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];

      // Verificar que usuario o correo no existan previamente
      const userExists = users.find(user => user.email === email || user.username === username);

      if (userExists) {
        alert('El correo electrónico o nombre de usuario ya está registrado.');
        return;
      }

      // Crear nuevo objeto de usuario
      const newUser = {
        fullName,
        username,
        email,
        password
      };

      // Guardar en la "base de datos" simulada
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      alert('¡Cuenta creada con éxito! Redirigiendo al inicio de sesión...');
      window.location.href = 'login.html';
    });
  }

  // ==========================================
  // 3. INICIO DE SESIÓN (login.html)
  // ==========================================
  const loginForm = document.getElementById('login-form');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const userInput = document.getElementById('login-user').value.trim();
      const passwordInput = document.getElementById('login-password').value;

      // Leer usuarios guardados
      const users = JSON.parse(localStorage.getItem('users')) || [];

      // Validar credenciales contra la lista guardada
      const validUser = users.find(
        user => (user.email === userInput || user.username === userInput) && user.password === passwordInput
      );

      if (validUser) {
        // Almacenar el usuario con sesión activa en localStorage
        localStorage.setItem('currentUser', JSON.stringify(validUser));
        alert(`¡Bienvenido de nuevo, ${validUser.fullName || validUser.username}!`);
        window.location.href = 'index.html';
      } else {
        alert('Usuario/Correo o contraseña incorrectos.');
      }
    });
  }

});