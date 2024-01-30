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
//Brands:
const scrollers = document.querySelectorAll(".scroller");

if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    addAnimation();
}
function addAnimation(){
    scrollers.forEach((scroller)=>{
        scroller.setAttribute("data-animated",true);

        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden",true);
            scrollerInner.appendChild(duplicatedItem);
        });
    });
}