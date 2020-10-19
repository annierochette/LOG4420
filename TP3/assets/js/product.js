
//TODO: Récupérer le paramètre dans l'URL
//TODO: Fetch + afficher les informations du produit

var products;

var req = new XMLHttpRequest();
var url = "data/products.json";

//Get la liste des produits
req.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
        products = JSON.parse(this.response);
        console.log(products);
    }
}
req.open("GET", url, true);
req.send();

$(function() {
  console.log( 'ready!' );
});



//TODO: Page d'erreur si ID invalide


//TODO: Bouton d'ajout fonctionnel

//TODO: Boîte dialog pour confirmer l'ajout au panier pour 5s
//TODO: Mettre à jour l'îcone de panier