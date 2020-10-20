
var products;
var activeProduct;

var req = new XMLHttpRequest();
var url = "data/products.json";

//Get la liste des produits
req.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
        products = JSON.parse(this.response);

    }
}
req.open("GET", url, true);
req.send();

$(function() {
  //Récupérer le paramètre dans l'URL
  var selectedId = urlParam();
  activeProduct = $.grep(products, function(prod){
    return prod.id === Number(selectedId);
  })[0];
  //Afficher les informations du produit
  if(activeProduct != undefined){
    var imageSrc = './assets/img/' + activeProduct.image;
    var price = activeProduct.price + '$';
    $('#product-name').text(activeProduct.name);
    $('#product-image').attr("src", imageSrc);
    $('#product-desc').append(activeProduct.description);
    $('#product-price').text(price);
    activeProduct.features.forEach(e => {
      var html = '<li>' + e +'</li>';
      $('#product-features').append(html);
    });
  }

  //Page d'erreur si ID invalide
  else {
    document.getElementById('product-name').nextElementSibling.innerHTML = "";
    document.getElementById('product-name').innerText = "Page non trouvée !";
  }

});


function urlParam() {
  var result = window.location.href.split("#");

  return result[1] || 0;
}


//TODO: Bouton d'ajout fonctionnel

//TODO: Boîte dialog pour confirmer l'ajout au panier pour 5s
//TODO: Mettre à jour l'îcone de panier