// CREE ELEMENTS 
function createElements() {
let sectionCartItems = document.querySelector('#cart__items');    

let articleCartItem = document.createElement('article');
articleCartItem.innerHTML = `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}"></article>`;
sectionCartItems.append(articleCartItem);

let divCartItemImg = document.createElement('div');
divCartItemImg.className = "cart__item__img";
articleCartItem.append(divCartItemImg);

let img = document.createElement('img');
divCartItemImg.append(img);

let divCartItenContent = document.createElement('div');
divCartItenContent.className = "cart__item__content";
articleCartItem.append(divCartItenContent);

let divCartItenContentDescription = document.createElement('div');
divCartItenContentDescription.className = "cart__item__content__description";
divCartItenContent.append(divCartItenContentDescription);

let h2 = document.createElement('h2');
h2.textContent = "Nom du produit";
divCartItenContentDescription.append(h2);

pColor = document.createElement('p');
pColor.textContent = "Couleur";
divCartItenContentDescription.append(pColor);

let pPrice = document.createElement('p');
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
input.value = 0;
divCartItemContentSettingsQuantity.append(input);

let divCartItemContentSettingsDelete = document.createElement('div');
divCartItemContentSettingsDelete.className = "cart__item__content__settings__delete";
divCartItemContentSettings.append(divCartItemContentSettingsDelete);

let pDeleteItem = document.createElement('p');
pDeleteItem.className = "deleteItem";
pDeleteItem.textContent = "Supprimer";
divCartItemContentSettingsDelete.append(pDeleteItem);
}


// GET LOCALSTORAGE 

function getBasket() {
    let basket = localStorage.getItem("basket");
    if (basket == null){
      return [];
    } else {
      return JSON.parse(basket);
    }
}

// CREE ARTICLES 
fetch('http://localhost:3000/api/products/')
.then(reponse => reponse.json())
.then(data => {

    let basket = getBasket();
    for (const product of basket) {
        createElements();
        pColor.textContent = product.color;
        input.value = product.quantity;
        console.log(product);
    }


})



