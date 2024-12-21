let slider = document.getElementById('slider');
let slides = document.querySelectorAll('.slide');
let prevButton = document.getElementById('prev')
let nextButton = document.getElementById('next')

let currentIndex = 0;

function updateSlider() {
    slides.forEach(element => {
    element.style.transform = `translateX(-${currentIndex * 100}%)` 
    });
}

function autoSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
}

let interval = setInterval(autoSlide, 3000);

prevButton.addEventListener('click', () => {
    clearInterval(interval);
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
    interval = setInterval(autoSlide, 3000);
})

nextButton.addEventListener('click', () => {
    clearInterval(interval);
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
    interval = setInterval(autoSlide, 3000);
})