window.addEventListener('load', function () {
    const button = document.getElementById('burger-button')
    button.addEventListener('click', function () {
        document.getElementById('side-menu').style.left = '0'; // Muestra el menú lateral
        document.getElementById('overlay').style.display = 'block'; // Muestra el overlay
    });

    const fondo = document.getElementById('overlay');
    fondo.addEventListener('click', function () {
        document.getElementById('side-menu').style.left = '-100%'; // Oculta el menú lateral
        this.style.display = 'none'; // Oculta el overlay
    });
});
