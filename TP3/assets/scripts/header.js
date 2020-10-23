const acartKey = "itemsInShoppingCart";

$(updateCartQuantity);

function updateCartQuantity() {
  const quantity = JSON.parse(localStorage.getItem(acartKey) || "{}").length;
  console.log(`Quantity ${quantity}`);
  if (quantity) {
    $(".shopping-cart > .count").html(quantity);
    $(".shopping-cart > .count").show();
  }
  else {
    $(".shopping-cart > .count").hide();
  }
}

window.addEventListener("storage", updateCartQuantity);