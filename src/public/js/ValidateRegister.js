window.addEventListener('load', function () {
    // Función para validar el formulario de registro
    function validarRegistro() {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const image = document.getElementById('image').value;
        //nombre y apellido
        if (firstName.length < 2 || lastName.length < 2) {

            // alert('El nombre y apellido deben tener al menos 2 caracteres.');
            let pError = document.getElementById(`error-firstName`);
            pError.innerHTML = 'El nombre y apellido deben tener al menos 2 caracteres.';
            pError.classList.add('is-invalid');
            return false;
        }
        //email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, introduce un email válido.');
            return false;
        }
        //contraseña
        if (password.length < 8) {
            alert('La contraseña debe tener al menos 8 caracteres.');
            return false;
        }

        // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/;
        if (!passwordRegex.test(password)) {
            alert('La contraseña debe contener al menos una mayúscula, una minúscula y un número.');
            return false;
        }

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return false;
        }
        // imagen
        const imageRegex = /\.(jpg|jpeg|png|gif)$/i;
        if (image && !imageRegex.test(image)) {
            alert('Por favor, selecciona un archivo de imagen válido (JPG, JPEG, PNG, GIF).');
            return false;
        }
        return true;
    }
    // acá se asegura de que se den todas las validaciones antes de que se envía el formulario.
    const formularioRegistro = document.querySelector('.form-register');
    formularioRegistro.addEventListener('submit', function (event) {
        if (!validarRegistro()) {
            event.preventDefault();
        }
        else{
            Alert('Formulado completado exitosamente');
        }
    });


    const form = document.querySelector('form');
    form.addEventListener('submit', (e)=>{
        const errors = [];


        const {firstname, lastName, password, email,confirmPassword,image } = form
        console.log(firstname.value.trim().length);
        if(firstname.value.trim().length < 2){
            firstname.classList.add('is-invalid');
            errors.push('El firstName y lastName deben tener al menos 2 caracteres.');
            firstname.innerHTML += `<ul>${errors.forEach((error)=> `<li>${error}</li>`)};</ul>`;
            e.preventDefault();
        }


        if(errors.length>0){
            e.preventDefault();
        }
        e.preventDefault();
    });


    //============OTRA FORMA====================================

    // const form = document.querySelector('form.form-register');
    // const inputs = [
    //     'firstName',
    //     'lastName',
    //     'email',
    //     'password',
    //     'confirmPassword'];
        
    //     const pErrors = document.querySelectorAll('p.error-message');
    //     console.log(pErrors);

    // form.addEventListener('submit', (e)=>{
    //     const errors = [];
    //     pErrors.forEach(e => {
    //         e.innerHTML = '';
    //     })
    //     inputs.forEach(input => {
    //          console.log('input: ');
    //          console.log(form[input].value);
    //         if(form[input].value.trim().length< 1){
    //             form[input].classList.add('is-invalid');
    //             errors.push({name : input, message: 'no puede ser vacío'});
                
    //             e.preventDefault();
    //         }else{
    //             form[input].classList.add('is-valid');
    //             form[input].classList.remove('is-invalid');
    //         }
    //     });
    //     errors.forEach(error => {
    //         const errorP = document.getElementById(`error-${error.name}`);
    //         errorP.innerHTML= error.message;
    //     })
        
    // });



    // //Para detectar la entrada de valores 
    // inputs.forEach(input => {
    //     const errors = [];
    //     pErrors.forEach( error =>{
    //         error.innerHTML = '';
    //     })
        
    //     form[input].addEventListener('input', ()=>{
    //         if(form[input].value.trim().length < 1){
    //             errors.push({name: input, message: 'No puede ser vacío'});
    //             form[input].classList.add('is-invalid');
    //         }else{
    //             pErrors.innerHTML = '';
    //             form[input].classList.add('is-valid');
    //             form[input].classList.remove('is-invalid');
    //         }
    //         errors.forEach(error =>{
    //             const errorP = document.getElementById(`error-${error.name}`);
    //             errorP.innerHTML = error.message;
    //         })
    //     });
    // });

})