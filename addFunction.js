let slide = document.querySelectorAll('.slide');
let product = 0;
let sum = 0;

document.cookie.split('; ').forEach(element => {
    if(element.startsWith('product=')) {
        product = Number(element.split('=')[1]) || 0;
    }
    if(element.startsWith('sum=')) {
        sum = Number(element.split('=')[1]) || 0;
    }
})

slide.forEach(element => {
    let div = document.createElement('button');
    div.id = "add-cart";
    div.textContent = 'add to cart';
    div.addEventListener('click', (event) => {
        product++;
        let num = Number(event.target.previousElementSibling.textContent.split(' ')[0]);
        console.log(event.target.previousElementSibling.textContent)
        sum += num;
        document.cookie = `product=${product}; samesite=none; secure`;
        document.cookie = `sum=${sum}; samesite=none; secure`;
        document.getElementById('product').textContent = `${product}`;
        document.getElementById('sum').textContent = `${sum}`;
    })
    element.appendChild(div);
})

document.getElementById('product').textContent = `${product}`;
if(sum ===0) {
document.getElementById('sum').textContent = `0.00`;
}
else {
    document.getElementById('sum').textContent = `${sum}`;
}

let cart = document.getElementById('cart-container');
let clean = document.getElementById('clean');


cart.addEventListener('mouseover', (event) => {
    clean.style.display ="block";
})

cart.addEventListener('mouseleave', (event)=> {
    setTimeout(function() {
        clean.style.display ="none";
    },1000)
})
clean.addEventListener('click', () => {
    product = 0;
    sum = 0;
    document.cookie = `product=0; samesite=none; secure`;
    document.cookie = `sum=0; samesite=none; secure`;
    document.getElementById('product').textContent = `0`;
    document.getElementById('sum').textContent = `0.00`;
})