fetch("http://localhost:3000/api/products/")
.then(reponse => reponse.json())
.then(data => {

    // CREATE ITEMS WITH A LOOP FOR OF
    for (const kanap of data) {

        // CREATE ELEMENT
        let a         = document.createElement("a");
        let article   = document.createElement("article");
        let img       = document.createElement("img");
        let h3        = document.createElement("h3");
        let p         = document.createElement("p");

        // PERSONNALIZE ELEMENT
        a.href          = "product.html?id=" + kanap._id;
        a.style.cursor  = "pointer";

        img.src         = kanap.imageUrl;
        img.alt         = kanap.altTxt;
        img.title       = kanap.altTxt;

        h3.textContent  = kanap.name;

        p.textContent   = kanap.description;

        // ADD ELEMENT
        items.append(a);
        a.append(article);
        article.append(img, h3, p);

        // ON CLICK DIRECTS TO THE PRODUCTS PAGE
        a.addEventListener("click",() => {
            window.location = a.href;
        });
    }
})