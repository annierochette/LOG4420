const express = require("express");
const router = express.Router();

router.get(["/", "/accueil"], (req, res) => {
    res.render("../views/pages/index", {title: "Accueil", message: "Ça semble fonctionner!"});
});

router.get("/produits", (req, res) => {
    res.render("../views/pages/products", {title: "Produits", message: "Ça semble fonctionner!"});
});

router.get("/produits/:id", (req, res) => {
    res.render("../views/pages/product", {title: "Produit", message: "Ça semble fonctionner!"});
});

router.get("/contact", (req, res) => {
    res.render("../views/pages/contact", {title: "Contact", message: "Ça semble fonctionner!"});
});

router.get("/panier", (req, res) => {
    res.render("../views/pages/shopping-cart", {title: "Panier", message: "Ça semble fonctionner!"});
});

router.get("/commande", (req, res) => {
    res.render("../views/pages/order", {title: "Commande", message: "Ça semble fonctionner!"});
});

router.get("/confirmation", (req, res) => {
    res.render("../views/pages/confirmation", {title: "Confirmation", message: "Ça semble fonctionner!"});
});

module.exports = router;
