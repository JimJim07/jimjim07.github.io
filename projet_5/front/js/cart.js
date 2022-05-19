// FUNCTIONS START ******************************************************************************
// SAVE ARTICLES BASKET
function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}

// EXIT ARTICLES BASKET
function getBasket() {
  let basket = localStorage.getItem("basket");
  
  if (basket == null){
    return [];
  } else {
    return JSON.parse(basket);
  }
}

// REMOVE ARTICLES 
function removeFromBasket(product) {
  let basket = getBasket();
  
  basket = basket.filter(p => p.id+p.color != product.id+product.color);
  
  saveBasket(basket);
}

// CHANGE QUANTITY 
// function changeQuantity(product,quantity) {
//   let basket = getBasket();
  
//   let foundProduct = basket.find(p => p.id == product.id);

//   if (foundProduct != undefined) {
//     foundProduct.quantity += quantity;
//     if (foundProduct.quantity <= 0) {
//       removeFromBasket(product);
//     } else {
//       saveBasket(basket);
//     }
//   }  
// }

// TOTAL QUANTITY BASKET
let quantityBasket = 0;
function totalQuantityBasket(quantity) {
  quantityBasket += quantity;
  return quantityBasket
}

// TOTAL PRICE BASKET
let priceBasket = 0;
function totalPriceBasket(price, quantity) { 
  priceBasket += quantity * price;
  return priceBasket
}
// FUNCTIONS END ******************************************************************************

// CREATE ARTICLES 
let basket = getBasket();

for (const product of basket) {
    
  fetch('http://localhost:3000/api/products/' + product.id)
  .then(response => response.json())
  .then(data => {
      
    let sectionCartItems = document.querySelector('#cart__items');    
    
    let articleCartItem = document.createElement('article');
    articleCartItem.innerHTML = `<article class="cart__item" data-id="${product.id}" data-color="${product.color}"></article>`;
    sectionCartItems.append(articleCartItem);

    let divCartItemImg = document.createElement('div');
    divCartItemImg.className = "cart__item__img";
    articleCartItem.append(divCartItemImg);

    let img = document.createElement('img');
    img.src = data.imageUrl;
    img.alt = data.altTxt;
    divCartItemImg.append(img);

    let divCartItenContent = document.createElement('div');
    divCartItenContent.className = "cart__item__content";
    articleCartItem.append(divCartItenContent);

    let divCartItenContentDescription = document.createElement('div');
    divCartItenContentDescription.className = "cart__item__content__description";
    divCartItenContent.append(divCartItenContentDescription);

    let h2 = document.createElement('h2');
    h2.textContent = data.name;
    divCartItenContentDescription.append(h2);

    let pColor = document.createElement('p');
    pColor.textContent = product.color;
    divCartItenContentDescription.append(pColor);

    let pPrice = document.createElement('p');
    pPrice.textContent  = ("Prix unitaire : " + data.price + " €");
    // let priceTotal = product.quantity * data.price;
    // pPrice.textContent  = ("prix total : " + priceTotal + " €");
    divCartItenContentDescription.append(pPrice);

    let divCartItemContentSettings = document.createElement('div');
    divCartItemContentSettings.className = "cart__item__content__settings";
    divCartItenContent.append(divCartItemContentSettings);

    let divCartItemContentSettingsQuantity = document.createElement('div');
    divCartItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
    divCartItemContentSettings.append(divCartItemContentSettingsQuantity);

    let pQuantity = document.createElement('p');
    pQuantity.textContent = "Qté : "
    divCartItemContentSettingsQuantity.append(pQuantity);

    let input = document.createElement('input');
    input.type = "number";
    input.className = "itemQuantity";
    input.name = "itemQuantity";
    input.min = 1;
    input.max = 100;
    input.value = product.quantity;
    // input.innerHTML = `<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">`;
    divCartItemContentSettingsQuantity.append(input);

    let divCartItemContentSettingsDelete = document.createElement('div');
    divCartItemContentSettingsDelete.className = "cart__item__content__settings__delete";
    divCartItemContentSettings.append(divCartItemContentSettingsDelete);

    let pDeleteItem = document.createElement('p');
    pDeleteItem.className = "deleteItem";
    pDeleteItem.textContent = "Supprimer";
    divCartItemContentSettingsDelete.append(pDeleteItem);
    
    pDeleteItem.addEventListener('click', () => {
      removeFromBasket(product);
      window.location = "cart.html";
    })
    
    totalQuantity.textContent = totalQuantityBasket(product.quantity);
    totalPrice.textContent    = totalPriceBasket(data.price, product.quantity);
  })
}