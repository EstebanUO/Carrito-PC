const mainCards = document.querySelector("main");
const selectProducts = document.getElementById("select-products");

let imgSelected = " ";
let idProduct = 0

window.addEventListener('load', listSelect);
selectProducts.addEventListener('change', renderCards);

function renderCards() {
    peripherals.map(peripheral =>{ peripheral.product === selectProducts.value ? createCards(peripheral) : null});
}

function listSelect() {
    selectProducts.innerHTML = ' ';
    const any = document.createElement('option');
    selectProducts.appendChild(any);
    any.textContent = "Select Product";

    peripherals.map( peripheral =>{
      const selector = document.createElement("option");
      selector.value = peripheral.product;
      selector.textContent = peripheral.product;
      selectProducts.appendChild(selector);
    });
};

function createCards(peripherals) {
    const {product, image,id,price} = peripherals;
  
    const cuadro = document.createElement('div');
    cuadro.classList.add('card-product');

    const images = document.createElement('img');
    images.setAttribute('src', image);
    images.setAttribute('alt', product);
    images.classList.add('img-product');

    const card_name = document.createElement('p');
    card_name.textContent = product;
    card_name.classList.add('name-product');

    const card_price = document.createElement('p');
    card_price.textContent = price;
    card_price.classList.add('price-product');

    const btn_boton = document.createElement('button');
    btn_boton.setAttribute('id', id);
    btn_boton.textContent = 'Add to cart';
    btn_boton.classList.add('btn-add');

    const deleteBoton = document.createElement('button');
    deleteBoton.setAttribute('id', id);
    deleteBoton.textContent = 'Delete';
    deleteBoton.classList.add('btn-delete');
    deleteBoton.addEventListener('click', deleteCard);

    cuadro.appendChild(images);
    cuadro.appendChild(card_name);
    cuadro.appendChild(card_price);
    cuadro.appendChild(btn_boton);
    cuadro.appendChild(deleteBoton);

    mainCards.appendChild(cuadro);

    function deleteCard() {
        cuadro.remove();
    }
}

// Creacion de nuevo producto con su imagen y precio
const modal = document.querySelector('.modal');
const btnAdd = document.getElementById('btn-newAdd');
const closeModal = document.getElementById('closeModal');
const ImportImg = document.getElementById('newImage');
const newProduct = document.getElementById('newProduct');
const newPrice = document.getElementById('newPrice');
const btnNewProd = document.getElementById('btn-Add');
const filterXPrice = document.getElementById('filterXPrice');

btnAdd.addEventListener('click', ()=> modal.style.display = 'flex');
closeModal.addEventListener('click', close);
btnAdd.addEventListener('click', ()=> effectBlur.style.visibility = 'visible');
btnNewProd.addEventListener('click', createNewProduct);
ImportImg.addEventListener('change', importImg);
filterXPrice.addEventListener('change', filterProduct);
newProduct.addEventListener('keyup', validation);
newPrice.addEventListener('keyup', validation);
ImportImg.addEventListener('change', validation);

function validation() {
    if (newProduct.value != '' && newPrice.value != '' && ImportImg.value != '') {
        btnNewProd.removeAttribute('disabled');
    }
}

function importImg(event) {
    const currentImg = event.target.files[0];
    const objectURL = URL.createObjectURL(currentImg);
    imgSelected = objectURL;   
};

function close() {
    modal.style.display = 'none';
    effectBlur.style.visibility = 'hidden';
};

function createNewProduct() {
    idProduct++;
    const titleProduct = newProduct.value;
    const priceProduct = newPrice.value;
    const id = idProduct;

    const newPeripherial = {id:id,product: titleProduct,price: priceProduct,image: imgSelected};

    peripherals.push(newPeripherial);
    listSelect();
    modal.style.display = 'none';

    effectBlur.style.visibility = 'hidden';
}

function filterProduct(event) {
    const responseFilter = event.target.value === 'Menores a 50'
    ? peripherals.filter(peripheral => peripheral.price < 50)
    : event.target.value === 'Entre 50 y 70'
    ? peripherals.filter(peripheral => peripheral.price >= 50 && peripheral.price <= 70.99)
    : event.target.value === 'Entre 75 y 85'
    ? peripherals.filter(peripheral => peripheral.price >= 75 && peripheral.price <= 85.99)
    : event.target.value === 'Entre 90 y 200'
    ? peripherals.filter(peripheral => peripheral.price >= 90 && peripheral.price <= 200.99)
    : event.target.value === 'Entre 700 y 2000'
    ? peripherals.filter(peripheral => peripheral.price >= 250)
    : null

    mainCards.innerHTML = '';
    responseFilter.map(peripheral => createCards(peripheral));
}