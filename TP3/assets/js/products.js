
//TODO: Rendre fonctionnel le groupe de bouton "product-categories" (classe selected à la sélection)
//TODO: Rendre fonctionnel le groupe de bouton "product-criteria" (classe selected à la sélection)

var criteria = "price";
var sortOrder = "asc"
var categorie = "";

var req = new XMLHttpRequest();
var url = "data/products.json";

//Get la liste des produits
req.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
        var products = JSON.parse(this.response);

        //Trier la liste
        products.sort(compareValues(criteria, sortOrder));

        createProducts(products);
        console.log(products);
    }
}
req.open("GET", url, true);
req.send();

//Crée les fiches de produits
function createProducts(array) {
    var out = "";
    var i;

    for(i = 0; i < array.length; i++){
        //var productURL = "./product.html?id=#" + array[i].id; //Formatage du lien pour affichage produit
        out += '<div class="product"> <a href="./product.html" title="En savoir plus..."> <h2>' + 
        array[i].name + '</h2> <img alt="' + array[i].name + '" src="./assets/img/' + 
        array[i].image + '"> <p class="price"><small>Prix</small>  ' + array[i].price +'&thinsp;$</p> </a></div>'
    }

    //Affiche le bon nombre de produits
    document.getElementById("products-count").innerText = array.length + " produits"
    //Affiche les fiches
    document.getElementById("products-list").innerHTML = out;
}

//Source: https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
function compareValues(key, order) {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }
  
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }
