
var criteria = "price";
var sortOrder = "asc"
var category = "all";

var products;
var sortedProducts;

var req = new XMLHttpRequest();
var url = "data/products.json";

//Get la liste des produits
req.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
        products = JSON.parse(this.response);

        createProducts();
    }
}
req.open("GET", url, true);
req.send();

//Groupe de boutons critères/catégories
$(function() {

  $('#product-categories').children('button').each(function () {
    $(this).on("click", function() {
      $(this).siblings('.selected').removeClass('selected');
      $(this).addClass('selected');
      var newCat = $(this).attr('name');
      category = newCat;

      createProducts();
    });
  });

  $('#product-criteria').children('button').each(function () {
    $(this).on("click", function() {
      $(this).siblings('.selected').removeClass('selected');
      $(this).addClass('selected');
      var newCrit = $(this).attr('name').split("-");
      criteria = newCrit[0];
      sortOrder = newCrit[1];

      createProducts();
    });
  });

});

//Filtre les produits par catégorie
function sortCategories() {
  var newArr = [];
  products.forEach(prod => {
    if(prod.category == category){
      newArr.push(prod);
    }
  });

  return newArr;
}

//Crée les fiches de produits
function createProducts() {
    var out = "";
    var i;
    sortedProducts = products;

    //Filtrer les catégories
    if(category != "all"){
      sortedProducts = sortCategories();
    }

    //Trier selon les critères
    sortedProducts = sortedProducts.sort(compareValues(criteria, sortOrder));

    for(i = 0; i < sortedProducts.length; i++){
        out += '<div class="product"> <a href="./product.html?id=#'+ sortedProducts[i].id + '" title="En savoir plus..."> <h2>' + 
        sortedProducts[i].name + '</h2> <img alt="' + sortedProducts[i].name + '" src="./assets/img/' + 
        sortedProducts[i].image + '"> <p class="price"><small>Prix</small>  ' + sortedProducts[i].price +'&thinsp;$</p> </a></div>'
    }

    //Affiche le bon nombre de produits
    document.getElementById("products-count").innerText = sortedProducts.length + " produits"
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
