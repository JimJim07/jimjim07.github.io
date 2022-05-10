fetch('http://localhost:3000/api/products/')
    .then(reponse => reponse.json())
    .then(data => {

        // Crée les articles avec une boucle for of
        for (const kanap of data) {

            // Crée element
            const a         = document.createElement('a');
            const article   = document.createElement('article');
            const img       = document.createElement('img');
            const h3        = document.createElement('h3');
            const p         = document.createElement('p');

            // Personnaliser element
            a.href          = "product.html?id=" + kanap._id;
            a.style.cursor  = "pointer";

            img.src         = kanap.imageUrl;
            
            h3.textContent  = kanap.name;

            p.textContent   = kanap.description;

            // Ajout element
            items.append(a);
            a.append(article);
            article.append(img, h3, p);

            // Au click dirigé sur la page produit avec href
            a.addEventListener('click',() => {
                window.location = a.href;
            });
        }
    })