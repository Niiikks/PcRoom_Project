let display = 'none';
let p = 0;
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
        display = 'none';
    }
}
function gaxsna(){
    let container = document.querySelector('.dropdown-content');
    container.style.display = 'block';
    display = 'block';
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
    if(display === 'none') {
        int = setInterval(gaxsna, 1);
    }
    else {
        int = setInterval(daxurva, 1);
    }
}