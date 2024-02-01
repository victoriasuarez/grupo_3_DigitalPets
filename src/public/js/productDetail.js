window.addEventListener("load", function () {
    let quantity = document.querySelector('.num').dataset.quantity;
    const maxQuantity = parseInt(document.querySelector('.num').dataset.stock); // Obtener el stock del producto

    // Obtener los botones y los campos de entrada
    const addButton = document.querySelector('.add');
    const subtractButton = document.querySelector('.out');
    const quantityButton = document.querySelector('.num');
    const quantityInput = document.querySelector('#quantityInput');
    
    // Función para actualizar la cantidad mostrada y la cantidad en el campo de entrada
    function updateQuantity() {
        console.log(quantity);
        quantityButton.innerHTML = quantity;
        quantityInput.value = quantity;
    }

    // Evento click para el botón de sumar
    addButton.addEventListener('click', function () {
        if (quantity < maxQuantity) {
            quantity++;
            updateQuantity();
        }
        const divButtons = document.querySelector(".wrapper");
        divButtons.style.backgroundColor = quantity == maxQuantity? "gray" : "black";
   
    });

    // Evento click para el botón de restar
    subtractButton.addEventListener('click', function () {
        if (quantity > 1) {
            quantity--;
            updateQuantity();
        }
        const divButtons = document.querySelector(".wrapper");
        divButtons.style.backgroundColor = quantity == maxQuantity? "gray" : "black";
    });

});