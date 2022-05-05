fetch('http://localhost:3000/api/products')
    .then(reponse => reponse.json())
    .then(data => {
        for (const canape of data) {
            const a = document.createElement('a');
            const article = document.createElement('article');

            const img = document.createElement('img');
            img.src = canape.imageUrl;
            
            const h3 = document.createElement('h3');
            h3.textContent = canape.name;

            const p = document.createElement('p');
            p.textContent = canape.description;

            items.append(a);
            a.append(article);
            article.append(img, h3, p);
        }
    })

