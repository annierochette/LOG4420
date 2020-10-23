
let criteria = "price";
let sortOrder = "asc";
let category = "all";

let products;
let sortedProducts;

const req = new XMLHttpRequest();

//Get la liste des produits
req.onreadystatechange = function() {
  if(this.readyState == 4 && this.status == 200) {
    products = JSON.parse(this.response);

    createProducts();
  }
};

req.open("GET", "data/products.json", true);
req.send();

//Groupe de boutons critères/catégories
$(function() {

  $("#product-categories").children("button").each(function () {
    $(this).on("click", function() {
      $(this).siblings(".selected").removeClass("selected");
      $(this).addClass("selected");
      const newCat = $(this).attr("name");
      category = newCat;

      createProducts();
    });
  });

  $("#product-criteria").children("button").each(function () {
    $(this).on("click", function() {
      $(this).siblings(".selected").removeClass("selected");
      $(this).addClass("selected");
      const newCrit = $(this).attr("name").split("-");
      criteria = newCrit[0];
      sortOrder = newCrit[1];

      createProducts();
    });
  });

});

//Filtre les produits par catégorie
function sortCategories() {
  const newArr = [];
  products.forEach(prod => {
    if(prod.category == category) {
      newArr.push(prod);
    }
  });

  return newArr;
}

//Crée les fiches de produits
function createProducts() {
  let out = "";
  sortedProducts = products;

  //Filtrer les catégories
  if(category != "all") {
    sortedProducts = sortCategories();
  }

  //Trier selon les critères
  sortedProducts = sortedProducts.sort(compareValues(criteria, sortOrder));

  sortedProducts.forEach(prod => {
    out += `<div class="product"> <a href="./product.html?id=#${prod.id}" title="En savoir plus..."> <h2>${
      prod.name}</h2> <img alt="${prod.name}" src="./assets/img/${
      prod.image}"> <p class="price"><small>Prix</small>  ${prod.price}&thinsp;$</p> </a></div>`;
  });

  //Affiche le bon nombre de produits
  document.getElementById("products-count").innerText = `${sortedProducts.length} produits`;
  //Affiche les fiches
  document.getElementById("products-list").innerHTML = out;
}

//Source: https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
function compareValues(key, order) {
  return function innerSort(a, b) {
    // eslint-disable-next-line no-prototype-builtins
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }
    const varA = (typeof a[key] === "string") ? a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === "string") ? b[key].toUpperCase() : b[key];
    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order === "desc") ? (comparison * -1) : comparison
    );
  };
}
