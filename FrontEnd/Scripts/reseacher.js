document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll("#slideshow figure");
    let current = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
        });
    }

    function nextSlide() {
        current = (current + 1) % slides.length;
        showSlide(current);
    }

    showSlide(current);
    setInterval(nextSlide, 4000);
});

// Simple Slideshow
let currentSlide = 0;
const slides = document.querySelectorAll('#slideshow .slide');

setInterval(() => {
    slides[currentSlide].style.display = 'none';
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].style.display = 'block';
}, 4000);
