const storageKey = "uneCle";
let items = [];

$(tempStore);
// $(renderView);

function tempStore() {
  showTable(false);

  $.get("./data/products.json").then(allItems => {
    localStorage.setItem(storageKey, JSON.stringify(allItems));
  }).then(renderView);
}

function renderView() {
  items = JSON.parse(localStorage.getItem(storageKey));

  if (items && items.length) {
    items.sort((a, b) => { return a.name >= b.name; });

    $("tbody").empty();
    items.forEach((item, index) => {
      item.quantity = 3;
      const element = addProduct(item);
      $("tbody").append(element);

      // Enable/Disable Retirer
      element.find("button[title=\"Retirer\"]").prop("disabled", item.quantity <= 1);

      // Supprimer
      element.find("button[title=\"Supprimer\"]").click(() => {
        const confirmation = confirm("Voulez-vous supprimer le produit du panier?");

        if (confirmation) {
          element.remove();
          items.splice(index, 1);
          updateLocalStorage();
        }
      });

      // Ajouter
      element.find("button[title=\"Ajouter\"]").click(() => {
        item.quantity += 1;
        element.find("button[title=\"Retirer\"]").prop("disabled", item.quantity <= 1);
        element.find("td:nth-child(4) > div > div:nth-child(2)").html(`${item.quantity}`);
        element.find("td:last-child").html(`${item.quantity * item.price}`);
        updateTotal();
        updateLocalStorage();
      });

      // Retirer
      element.find("button[title=\"Retirer\"]").click(() => {
        item.quantity -= 1;
        element.find("td:nth-child(4) > div > div:nth-child(2)").html(`${item.quantity}`);
        element.find("button[title=\"Retirer\"]").prop("disabled", item.quantity <= 1);
        element.find("td:last-child").html(`${item.quantity * item.price}`);
        updateTotal();
        updateLocalStorage();
      });
    });

    $("article > button").click(() => {
      const removeAll = confirm("Voulez-vous supprimer tous les produits du panier?");

      if (removeAll) {
        items = [];
        updateLocalStorage();
        renderView();
      }
    });

    updateLocalStorage();
    updateTotal();

    showTable(true);
  }
  else {
    showTable(false);
  }
}

function addProduct(item) {
  return $(`<tr>
  <td><button class="remove-item-button" title="Supprimer"><i class="fa fa-times"></i></button></td>
  <td><a href="./product.html">${item.name}</a></td>
  <td>${item.price}&thinsp;$</td>
  <td>
    <div class="row">
      <div class="col">
        <button title="Retirer" disabled=""><i class="fa fa-minus"></i></button>
      </div>
      <div class="col">${item.quantity}</div>
      <div class="col">
        <button title="Ajouter"><i class="fa fa-plus"></i></button>
      </div>
    </div>
  </td>
  <td>${item.quantity * item.price}&thinsp;$</td>
</tr>`);
}

function showTable(mustShow) {
  if (mustShow) {
    $("#emptyMessage").remove();

    $("table.shopping-cart-table")
      .add($(".shopping-cart-total"))
      .add($(".btn pull-right"))
      .add($(".btn"))
      .show();
  }
  else{
    $("table.shopping-cart-table")
      .add($(".shopping-cart-total"))
      .add($(".btn pull-right"))
      .add($(".btn"))
      .hide();

    $("h1").after("<p id=\"emptyMessage\">Aucun produit dans le panier.</p>");
  }

}

function updateTotal() {
  let total = 0;
  items.forEach(item => {
    total += item.price * item.quantity;
  });

  $(".shopping-cart-total").html(`Total: <strong>${total}&thinsp;$</strong>`);
}


function updateLocalStorage() {
  localStorage.setItem(storageKey, JSON.stringify(items));
}
