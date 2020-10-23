
let productList;
let activeProduct;

const req = new XMLHttpRequest();

//Get la liste des produits
req.onreadystatechange = function() {
  if(this.readyState == 4 && this.status == 200) {
    productList = JSON.parse(this.response);

    showProduct();
  }
};
req.open("GET", "data/products.json", true);
req.send();

$(function() {

  $("#add-to-cart-form").on("submit", function() {
    const qty = $("#product-quantity").val();
    addToCart(qty);
    $("#dialog").fadeIn(400).delay(5000).fadeOut(400);

    return false;
  });

});

function addToCart(quantity) {
  const currentCart = JSON.parse(localStorage.getItem("itemsInShoppingCart"));
  let cart = [];

  const newItem = {
    id: activeProduct.id,
    name: activeProduct.name,
    quantity: Number(quantity),
    price: activeProduct.price
  };

  if (!currentCart) {
    addToLocalStorage(newItem);
  } else {
    localStorage.removeItem("itemsInShoppingCart");
    if(!Array.isArray(currentCart)) {
      cart.push(currentCart);
    } else {
      cart = currentCart;
    }
    if(cart.some(i => i.id === activeProduct.id)) {
      cart.forEach(prod => {
        if(prod.id === activeProduct.id) {
          const newQty = Number(quantity) + Number(prod.quantity);
          prod.quantity = newQty;
        }
      });
      addToLocalStorage(cart);
    } else {
      cart.push(newItem);
      addToLocalStorage(cart);
    }
  }
}

function showProduct() {
  const selectedId = urlParam();
  activeProduct = $.grep(productList, function(prod) {return prod.id === Number(selectedId);})[0];
  //Afficher les informations du produit
  if(activeProduct != undefined) {
    const imageSrc = `./assets/img/${activeProduct.image}`;
    const price = `${String(activeProduct.price).replace(".", ",")} $`;
    $("#product-name").text(activeProduct.name);
    $("#product-image").attr("src", imageSrc);
    $("#product-desc").append(activeProduct.description);
    $("#product-price").text(price);
    activeProduct.features.forEach(e => {
      const html = `<li>${e}</li>`;
      $("#product-features").append(html);
    });
  }
  //Page d'erreur si ID invalide
  else {
    $("#product-name").nextAll().remove();
    document.getElementById("product-name").innerText = "Page non trouvée!";
  }
}

function urlParam() {
  const result = window.location.href.split("=");

  return result[1] || 0;
}

//TODO: Mettre à jour l'îcone de panier
function addToLocalStorage(items) {
  localStorage.setItem("itemsInShoppingCart", JSON.stringify(items));

  if (items.length) {
    $(".shopping-cart > .count").html(`${items.length}`);
    $(".shopping-cart > .count").show();
  }
  else {
    $(".shopping-cart > .count").hide();
  }
}