window.addEventListener('load', function () {
    // Función para mostrar mensajes de error
    function mostrarMensajeError(elemento, mensaje) {
        var mensajeError = document.getElementById(elemento + 'Error');
        if (mensajeError) {
            mensajeError.textContent = mensaje;
            mensajeError.style.display = mensaje ? 'block' : 'none';
        }
    }

    // Validar el campo de nombre
    function validarNombre(input) {
        var valor = input.value.trim();

        if (valor === '') {
            mostrarMensajeError('nombre', 'El nombre es obligatorio.');
            return false;
        } else if (valor.length < 2) {
            mostrarMensajeError('nombre', 'El nombre debe tener al menos 2 caracteres.');
            return false;
        } else {
            mostrarMensajeError('nombre', ''); // Limpiar mensaje 
            return true;
        }
    }

    // Validar el campo de apellido
    function validarApellido(input) {
        var valor = input.value.trim();

        if (valor === '') {
            mostrarMensajeError('apellido', 'El apellido es obligatorio.');
            return false;
        } else if (valor.length < 2) {
            mostrarMensajeError('apellido', 'El apellido debe tener al menos 2 caracteres.');
            return false;
        } else {
            mostrarMensajeError('apellido', ''); // Limpiar mensaje de error
            return true;
        }
    }

    // Validar el campo de correo electrónico
    function validarEmail(input) {
        var valor = input.value.trim();

        if (valor === '') {
            mostrarMensajeError('email', 'El correo electrónico es obligatorio.');
            return false;
        } else {
         
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(valor)) {
                mostrarMensajeError('email', 'Por favor, introduce un correo electrónico válido.');
                return false;
            } else {
                mostrarMensajeError('email', ''); // Limpiar mensaje de error
                return true;
            }
        }
    }

    // Validar el campo de contraseña
    function validarContrasena(input) {
        var valor = input.value.trim();

        if (valor === '') {
            mostrarMensajeError('contrasena', 'La contraseña es obligatoria.');
            return false;
        } else if (valor.length < 8) {
            mostrarMensajeError('contrasena', 'La contraseña debe tener al menos 8 caracteres.');
            return false;
        } else {
            mostrarMensajeError('contrasena', ''); // Limpiar mensaje de error
            return true;
        }
    }

    // Validar el campo de imagen
    function validarImagen(input) {
        var valor = input.value.trim().toLowerCase();

        if (valor === '') {
            mostrarMensajeError('imagenPerfil', 'La imagen es obligatoria.');
            return false;
        } else {
            var imagenRegex = /\.(jpg|jpeg|png|gif)$/;
            if (!imagenRegex.test(valor)) {
                mostrarMensajeError('imagenPerfil', 'Por favor, selecciona un archivo de imagen válido (JPG, JPEG, PNG, GIF).');
                return false;
            } else {
                mostrarMensajeError('imagenPerfil', ''); // Limpiar mensaje de error
                return true;
            }
        }
    }

    function manejarBlur(event) {
        var tipoCampo = event.target.id;
        switch (tipoCampo) {
            case 'nombre':
                validarNombre(event.target);
                break;
            case 'apellido':
                validarApellido(event.target);
                break;
            case 'email':
                validarEmail(event.target);
                break;
            case 'contrasena':
                validarContrasena(event.target);
                break;
            case 'imagenPerfil':
                validarImagen(event.target);
                break;
           
        }
    }

    var camposFormulario = document.querySelectorAll('.form-register input');
    camposFormulario.forEach(function (campo) {
        campo.addEventListener('blur', manejarBlur);
    });

    // Valida el formulario completo antes del envío
    function validarFormulario() {
        var nombreValido = validarNombre(document.getElementById('nombre'));
        var apellidoValido = validarApellido(document.getElementById('apellido'));
        var emailValido = validarEmail(document.getElementById('email'));
        var contrasenaValida = validarContrasena(document.getElementById('contrasena'));
        var imagenValida = validarImagen(document.getElementById('imagenPerfil'));

        return nombreValido && apellidoValido && emailValido && contrasenaValida && imagenValida;
    }

    var formularioRegistro = document.querySelector('.form-register');
    formularioRegistro.addEventListener('submit', function (event) {
        if (!validarFormulario()) {
            event.preventDefault();
        }
    });
});