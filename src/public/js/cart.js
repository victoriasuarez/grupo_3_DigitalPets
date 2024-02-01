
document.addEventListener("DOMContentLoaded", function () {
    // Asigna los botones de incremento y decremento a las variables correspondientes
    const addButtons = document.querySelectorAll(".add");
    const outButtons = document.querySelectorAll(".out");
    const numElements = document.querySelectorAll(".num");

    addButtons.forEach((addButton, index) => {
        addButton.addEventListener("click", () => {
            const divButtons = document.querySelector(".wrapper");
            let quantity = parseInt(numElements[index].innerText);
            let stock = parseInt(numElements[index].dataset.stock); // Obtener el stock del producto
            if (quantity < stock) {
                quantity++;
                numElements[index].innerText = quantity;
                divButtons.style.backgroundColor = "black";
            } else {
                divButtons.style.backgroundColor = "gray";
            }
        });
    });

    outButtons.forEach((outButton, index) => {
        const divButtons = document.querySelector(".wrapper");
        outButton.addEventListener("click", () => {
            let quantity = parseInt(numElements[index].innerText);
            if (quantity > 1) {
                quantity--;
                numElements[index].innerText = quantity;
                divButtons.style.backgroundColor = "black";
            }
        });
    });
    numElements.forEach((numElement) => {
        let quantity = parseInt(numElement.innerText);
        let stock = parseInt(numElement.dataset.stock); // Obtener el stock del producto
        const divButtons = document.querySelector(".wrapper");
        if (quantity >= stock) {
            divButtons.style.backgroundColor = "gray";
        } else {
            divButtons.style.backgroundColor = "black";
        }
        
    });

    const finalizePurchase = document.getElementById('finalizePurchase');
    finalizePurchase.addEventListener('click',(e)=>{
        e.preventDefault();

    })
});
