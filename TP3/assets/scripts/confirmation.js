const orderKey = "orders";

$(() => {
  const infos = JSON.parse(localStorage.getItem(orderKey));
  const orderInfos = infos[infos.length-1];

  $("h1").html(`Votre commande est confirmée ${orderInfos.firstname} ${orderInfos.lastname}!`);
  $("h1 ~ p").html(`<p>Votre numéro de confirmation est le <strong>${("00000" + orderInfos.orderNumber).slice(-5)}</strong>.</p>`);
});