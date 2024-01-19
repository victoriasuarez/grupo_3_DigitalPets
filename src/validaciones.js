window.addEventListener('load', function () {
  // Función para validar el formulario de registro
  function validarRegistro() {
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var email = document.getElementById('email').value;
    var contrasena = document.getElementById('contrasena').value;
    var repetirContrasena = document.getElementById('repetir_contrasena').value;
    var imagenPerfil = document.getElementById('imagenPerfil').value;
    //nombre
    if (nombre.length < 2 || apellido.length < 2) {
      alert('El nombre y apellido deben tener al menos 2 caracteres.');
      return false;
    }
    //email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, introduce un email válido.');
      return false;
    }
    //contraseña
    if (contrasena.length < 8) {
      alert('La contraseña debe tener al menos 8 caracteres.');
      return false;
    }

    var contrasenaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    if (!contrasenaRegex.test(contrasena)) {
      alert('La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial.');
      return false;
    }

    if (contrasena !== repetirContrasena) {
      alert('Las contraseñas no coinciden.');
      return false;
    }
    // imagen
    var imagenRegex = /\.(jpg|jpeg|png|gif)$/i;
    if (!imagenRegex.test(imagenPerfil)) {
      alert('Por favor, selecciona un archivo de imagen válido (JPG, JPEG, PNG, GIF).');
      return false;
    }

    return true;
  }
  // acá se asegura de que se den todas las validaciones antes de que se envía el formulario.
  var formularioRegistro = document.querySelector('.form-register');
  formularioRegistro.addEventListener('submit', function (event) {
    if (!validarRegistro()) {
      event.preventDefault();
    }
  });

  //Función para validar el formulario de productos (creación y edición)
  function validarProducto() {
    var productName = document.getElementById('productName').value;
    var productDescription = document.getElementById('productDescription').value;
     var productImage = document.getElementById('productImage').value;
    // nombre de producto
    if (productName.length < 5) {
      alert('El nombre del producto debe tener al menos 5 caracteres.');
      return false;
    }
    // descripción del producto
    if (productDescription.length < 20) {
      alert('La descripción del producto debe tener al menos 20 caracteres.');
      return false;
    }
    // imagen
    var imageRegex = /\.(jpg|jpeg|png|gif)$/i;
    if (!imageRegex.test(productImage)) {
      alert('Por favor, selecciona un archivo de imagen válido (JPG, JPEG, PNG, GIF).');
      return false;
    }

   
    return true;
  }

  // acá se asegura de que se den todas las validaciones antes de que se envía el formulario.
  var formularioProducto = document.querySelector('.form-product form');
  formularioProducto.addEventListener('submit', function (event) {
    if (!validarProducto()) {
      event.preventDefault();
    }
  });
});