// CREE ELEMENTS 
function createElements(productId, productColor ) {
let sectionCartItems = document.querySelector('#cart__items');    

let articleCartItem = document.createElement('article');
articleCartItem.innerHTML = `<article class="cart__item" data-id="${productId}" data-color="${productColor}"></article>`;
sectionCartItems.append(articleCartItem);

let divCartItemImg = document.createElement('div');
divCartItemImg.className = "cart__item__img";
articleCartItem.append(divCartItemImg);

img = document.createElement('img');
divCartItemImg.append(img);

let divCartItenContent = document.createElement('div');
divCartItenContent.className = "cart__item__content";
articleCartItem.append(divCartItenContent);

let divCartItenContentDescription = document.createElement('div');
divCartItenContentDescription.className = "cart__item__content__description";
divCartItenContent.append(divCartItenContentDescription);

h2 = document.createElement('h2');
h2.textContent = "Nom du produit";
divCartItenContentDescription.append(h2);

pColor = document.createElement('p');
pColor.textContent = "Couleur";
divCartItenContentDescription.append(pColor);

pPrice = document.createElement('p');
pPrice.textContent = "Prix";
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

input = document.createElement('input');
input.type = "number";
input.className = "itemQuantity";
input.name = "itemQuantity";
input.min = 1;
input.max = 100;
input.value = 42;
// input.innerHTML = `<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">`;
divCartItemContentSettingsQuantity.append(input);

divCartItemContentSettingsDelete = document.createElement('div');
divCartItemContentSettingsDelete.className = "cart__item__content__settings__delete";
divCartItemContentSettings.append(divCartItemContentSettingsDelete);

pDeleteItem = document.createElement('p');
pDeleteItem.className = "deleteItem";
pDeleteItem.textContent = "Supprimer";
divCartItemContentSettingsDelete.append(pDeleteItem);
}

// LOCALSTORAGE 
function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket));
}

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
    basket = basket.filter(p => p.id != product.id);
    
    saveBasket(basket);
}
// CHANGE QUANTITY 
function changeQuantity(product,quantity) {
    let basket = getBasket();
    let foundProduct = basket.find(p => p.id == product.id);
    if (foundProduct != undefined) {
        foundProduct.quantity += quantity;
        if (foundProduct.quantity <= 0) {
            removeFromBasket(product);
        } else {
            saveBasket(basket);
        }
    }
    
}
// TOTAL PRICE BASKET
function totalPriceBasket(prix, nombreDeProduit) {
    return prix * nombreDeProduit;
  }

// CREE ARTICLES 

let basket = getBasket();

for (const product of basket) {
    
    fetch('http://localhost:3000/api/products/' + product.id)
    .then(response => response.json())
    .then(data => {
        
        createElements(product.id, product.color);
        
        img.src             = data.imageUrl;
        img.alt             = data.altTxt;
        h2.textContent      = data.name;
        pColor.textContent  = product.color;
        pPrice.textContent  = ("prix unitaire : " + data.price + " €");
        priceTotal          = product.quantity * data.price;
        // pPrice.textContent  = ("prix total : " + priceTotal + " €");
        input.value         = product.quantity;

        totalPrice.textContent = priceTotal;

        pDeleteItem.addEventListener('click', () => {
            removeFromBasket(product);
            window.location = "cart.html";
        })
    })
} 

// TOTAL PANIER

function totalQuantityBasket() {
  
  let total = 0;
  for (const product of basket) {
    total += product.quantity;
  }
  return total;
}

totalQuantity.textContent = totalQuantityBasket();

// TOTAL PRICE 

function totalPriceBasket() {
  
    let total = 0;
    for (const product of basket) {
      total += product.quantity * product.price;
    }
    return total
  }
  totalPrice.textContent = totalPriceBasket();