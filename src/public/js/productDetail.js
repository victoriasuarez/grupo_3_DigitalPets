window.addEventListener("load",function(){
       // Inicializar la cantidad en 1
       let quantity = 1;
       const maxQuantity = document.querySelector('.num').dataset.stock; // Obtener el stock del producto
   
       // Obtener los botones y los campos de entrada
       const addButton = document.querySelector('.add button');
       const subtractButton = document.querySelector('.out button');
       const quantityButton = document.querySelector('.num button');
       const quantityInput = document.querySelector('#quantityInput');
       const addToCartForm = document.querySelector('#addToCartForm');
   
       // Función para actualizar la cantidad mostrada y la cantidad en el campo de entrada
       function updateQuantity() {
           quantityButton.textContent = quantity;
           quantityInput.value = quantity;
       }
   
       // Evento click para el botón de sumar
       addButton.addEventListener('click', function() {
           if (quantity < maxQuantity) {
               quantity++;
               updateQuantity();
           }
       });
   
       // Evento click para el botón de restar
       subtractButton.addEventListener('click', function() {
           if (quantity > 1) {
               quantity--;
               updateQuantity();
           }
       });
   
       // Evento submit para el formulario de agregar al carrito
    //    addToCartForm.addEventListener('submit', function(event) {
    //        event.preventDefault(); // Prevenir el envío del formulario
    //         console.log('Todo salio ok');
    //        // Crear un objeto FormData con los datos del formulario
    //     //    const formData = new FormData(addToCartForm);
   
    //        // Enviar los datos del formulario al servidor
    //     //    fetch('/products/addToCart', {
    //     //        method: 'POST',
    //     //        body: formData
    //     //    })
    //     //    .then(response => response.json())
    //     //    .then(data => {
    //     //        // Redirigir al usuario al carrito
    //     //        window.location.href = '/products/cart';
    //     //    });
    //    });
});