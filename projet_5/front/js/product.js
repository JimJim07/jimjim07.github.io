// SAUVEGARDE LES ARTICLES AU PANIER 
function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket));
}

// SORT LES ARTICLES DU PANIER 
function getBasket() {
    let basket = localStorage.getItem("basket");
    if (basket == null){
      return [];
    } else {
      return JSON.parse(basket);
    }
}

// AJOUTE LES ARTICLES PANIER 
function addBasket(product) {
    let basket = getBasket();

    // RECHERCHE SI ID OU COLOR EST IDENTIQUE
    let foundId = basket.find( p => p.id == product.id);
    let foundColor = basket.find( p => p.color == product.color);

    if (foundId != undefined && foundColor != undefined) {

        if (foundColor != undefined) {

            foundColor.quantity += product.quantity;

        } else {

            foundId.quantity += product.quantity;
        }
        
    } else {
        
        basket.push(product);
    }
    saveBasket(basket);
}

// RECHERCHE DANS URL ID KANAP
const url = new URL(window.location);
const idKanap = url.searchParams.get("id");

fetch('http://localhost:3000/api/products/'+ idKanap)
    .then(reponse => reponse.json())
    .then(data => {

        // SELECTIONNER OU CREE ELEMENT
        let itemImage     = document.querySelector('.item__img');
        let img           = document.createElement('img');
        // let title         = document.querySelector('#title');
        // let price         = document.querySelector('#price');
        // let description   = document.querySelector('#description');
        let colors        = document.querySelector('#colors');

        // PERSONNALISER ELEMENT
        img.src                 = data.imageUrl;
        img.alt                 = data.altTxt;
        img.title               = data.altTxt;

        title.textContent       = data.name;

        price.textContent       = data.price;

        description.textContent = data.description;

        // AJOUT ELEMENT
        itemImage.append(img);

        // BOUCLE FOR OF POUR CREE CHAQUE COULEUR
        for (const color of data.colors) {

            // CREE ELEMNET
            let optionColor          = document.createElement('option');
            // PERSONNALISER ELEMENT
            optionColor.textContent  = color;
            optionColor.value        = color;
            // AJOUT ELEMENT
            colors.append(optionColor);
        }
            
        // AJOUT DES PRODUITS AU PANIER

        addToCart.addEventListener('click', ()=> {

            // TABLEAU DES PRODUITS 
            
            let product = {
                id          : data._id,
                color       : colors.value,
                quantity    : Number(quantity.value)
            }
            
            if ( product.color == "" || product.quantity <= 0) {
                alert("Veuillez saisir tous les champs");
            }else {
                addBasket(product)
                if (confirm("Article ajouter au panier.\nVoulez vous aller au panier.")) {
                    window.location = "cart.html";
                }  
            }
        })
    })