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

document.getElementById('product').textContent = `${product}`;
if(sum === 0) {
document.getElementById('sum').textContent = `0.00`;
}
else {
    document.getElementById('sum').textContent = `${sum}`;
}
