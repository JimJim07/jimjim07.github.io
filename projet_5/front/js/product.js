// RECHERCHE DANS URL ID KANAP
const url = new URL(window.location);
const idKanap = url.searchParams.get("id");

fetch('http://localhost:3000/api/products/'+ idKanap)
    .then(reponse => reponse.json())
    .then(data => {
        
        // SELECTIONNER OU CREE ELEMENT
        const itemImage     = document.querySelector('.item__img');
        const img           = document.createElement('img');
        // const title         = document.querySelector('#title');
        // const price         = document.querySelector('#price');
        // const description   = document.querySelector('#description');
        const colors        = document.querySelector('#colors');

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

            if ( product.color == "" || product.quantity <= 0) {
                alert("Veuillez saisir tous les champs");
            }else {
                addBasket(product)
                if (confirm("Article ajouter au panier.\nVoulez vous aller au panier")) {
                    window.location = "cart.html";
                }  
            }
        })
    })