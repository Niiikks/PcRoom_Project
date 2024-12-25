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

// dropdown button
let p = 50;
let int;
function daxurva(){
    let container = document.querySelector('.dropdown-content');
    p -= 3;
    container.style.height = `${p}px`;
    if(p <= 8) {
        container.style.paddingTop = `${p}px`;
    }
    if(p <= 0) {
        clearInterval(int);
        container.style.display = 'none';
    }
}
function gaxsna(){
    let container = document.querySelector('.dropdown-content');
    container.style.display = 'block';
    p += 3;
    container.style.height = `${p}px`;
    if(p >= 10) {
        container.style.paddingTop = `10px`;
    }
    if(p >= 50) {
        clearInterval(int);
    }
}



function start() {
    if(p<=0) {
        int = setInterval(gaxsna, 1);
    }
    else {
        int = setInterval(daxurva, 1);
    }
}

