const express = require("express");
const mongoose = require('mongoose')
const router = express.Router();

const Product = mongoose.model('Product');

function formatPrice(price) {
    return price.toFixed(2).replace(".", ",") + "&thinsp;$";
  }

router.get(["/", "/accueil"], (req, res) => {
    res.render("../views/pages/index", {title: "Accueil", shoppingCartCount: 5 });
});

router.get("/produits", async (req, res) => {
    const products = await Product.find({}).collation({ locale: "en" }).sort({"price": 1});
    res.render("../views/pages/products", {title: "Produits", shoppingCartCount: 5, productList: products, formatPrice: formatPrice });
});

router.get("/produits/:id", async (req, res) => {
    try {
        const productList = await Product.find({id: req.params.id});
        res.render("../views/pages/product", {title: "Produit", shoppingCartCount: 5, product: productList[0], formatPrice: formatPrice });
    } catch (err) {
        res.sendStatus(500);
    }
});

router.get("/contact", (req, res) => {
    res.render("../views/pages/contact", {title: "Contact", shoppingCartCount: 5 });
});

router.get("/panier", (req, res) => {
    res.render("../views/pages/shopping-cart", {title: "Panier", shoppingCartCount: 5 });
});

router.get("/commande", (req, res) => {
    res.render("../views/pages/order", {title: "Commande", shoppingCartCount: 5 });
});

router.get("/confirmation", (req, res) => {
    res.render("../views/pages/confirmation", {title: "Confirmation", shoppingCartCount: 5 });
});

module.exports = router;
