window.addEventListener('load', function(){
    let index = 0;
    const images = document.querySelectorAll('.carousel-images img');
    const indicators = document.querySelectorAll('.carousel-indicators span');

    function updateCarousel() {
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }

    document.querySelector('.carousel-buttons .prev').addEventListener('click', () => {
        index = (index - 1 + images.length) % images.length;
        updateCarousel();   
    });

    document.querySelector('.carousel-buttons .next').addEventListener('click', () => {
        index = (index + 1) % images.length;
        updateCarousel();
    });

    indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => {
            index = i;
            updateCarousel();
        });
    });

    setInterval(() => {
        index = (index + 1) % images.length;
        updateCarousel();
    }, 6000);

    updateCarousel();
});