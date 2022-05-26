// FUNCTIONS START ******************************************************************************
// SAVE ITEMS BASKET 
function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket));
}

// EXIT ITEMS BASKET 
function getBasket() {
    let basket = localStorage.getItem("basket");
    if (basket == null){
      return [];
    } else {
      return JSON.parse(basket);
    }
}

// ADD ITEMS BASKET 
function addBasket(product) {
    let basket = getBasket();
    // RESEARCH IF ID AND COLOR IDENTICAL
    let foundProduct = basket.find(p => p.id+p.color == product.id+product.color);

    if (foundProduct != undefined) {

      foundProduct.quantity += product.quantity;
    } else {

      basket.push(product);
    }
  
    saveBasket(basket);
  }
// FUNCTIONS END **************************************************************************

// RESEARCH IN URL ID KANAP
const url = new URL(window.location);
const idKanap = url.searchParams.get("id");

fetch('http://localhost:3000/api/products/'+ idKanap)
  .then(reponse => reponse.json())
  .then(data => {

    // SELECTED OR CREATE ELEMENT
    let itemImage     = document.querySelector('.item__img');
    let img           = document.createElement('img');
    // let title         = document.querySelector('#title');
    // let price         = document.querySelector('#price');
    // let description   = document.querySelector('#description');
    let colors        = document.querySelector('#colors');

    // PERSONNALIZE ELEMENT
    img.src                 = data.imageUrl;
    img.alt                 = data.altTxt;
    img.title               = data.altTxt;

    title.textContent       = data.name;

    price.textContent       = data.price;

    description.textContent = data.description;

    // ADD ELEMENT
    itemImage.append(img);

    // BOUCLE FOR OF CREATE EACH COLOR
    for (const color of data.colors) {

      // CREATE ELEMENT
      let optionColor          = document.createElement('option');
      // PERSONNALIZE ELEMENT
      optionColor.textContent  = color;
      optionColor.value        = color;
      // ADD ELEMENT
      colors.append(optionColor);
    }
        
    // ADD ITEMS BASKET
    addToCart.addEventListener('click', ()=> {

      // TABLE OF ITEMS
      let product = {
        id          : data._id,
        color       : colors.value,
        quantity    : Number(quantity.value),
        price       : data.price
      }
      
      if ( product.color == "" || product.quantity <= 0) {
        alert("Veuillez saisir tous les champs");
      }else {
        addBasket(product);
        if (confirm("Article ajouter au panier.\nVoulez vous aller au panier.")) {
          window.location = "cart.html";
        }  
      }
    })
  })