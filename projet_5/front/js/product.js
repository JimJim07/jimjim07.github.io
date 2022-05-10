// rechercher dans url id de kanap
const url = new URL(window.location);
const idCanap = url.searchParams.get("id");

fetch('http://localhost:3000/api/products/'+ idCanap)
    .then(reponse => reponse.json())
    .then(data => {
        
        // Sélectionner ou crée element
        const itemImage     = document.querySelector('.item__img');
        const img           = document.createElement('img');
        // const title         = document.querySelector('#title');
        // const price         = document.querySelector('#price');
        // const description   = document.querySelector('#description');
        const colors        = document.querySelector('#colors');

        // Personnaliser element
        img.src                 = data.imageUrl;
        title.textContent       = data.name;
        price.textContent       = data.price;
        description.textContent = data.description;

        // Ajout element
        itemImage.append(img);

        // Boucle for of pour crée chaque couleur
        for (const color of data.colors) {

            // Crée element 
            var optionColor          = document.createElement('option');
            // Personnaliser element 
            optionColor.textContent  = color;
            optionColor.value        = color;
            // Ajout element 
            colors.append(optionColor);
        }

        // test
        console.log(data);

        addToCart.addEventListener('click', ()=> {
            let idProduct = [];
            let colorProduct = [];
            
            idProduct.push(data._id);
            colorProduct.push(optionColor.value);

            console.log(idProduct);
            console.log(colorProduct);
            })
    })

    