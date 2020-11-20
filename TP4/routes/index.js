const express = require("express");
const mongoose = require('mongoose')
const router = express.Router();
const axios = require('axios').default;

const Product = mongoose.model('Product');

function formatPrice(price) {
    return price.toFixed(2).replace(".", ",") + "&thinsp;$";
  }

router.get(["/", "/accueil"], (req, res) => {
    res.render("../views/pages/index", {title: "Accueil", shoppingCartCount: 5 });
});

router.get("/produits", async (req, res) => {
    const answer = await axios.get("http://localhost:8000/api/products/");
    const products = answer.data;
    res.render("../views/pages/products", {title: "Produits", shoppingCartCount: 5, productList: products, formatPrice: formatPrice });
});

router.get("/produits/:id", async (req, res) => {
    try {
        console.log(req.params.id)
        const answer = await axios.get("http://localhost:8000/api/products/" + req.params.id);
        const productList = answer.data;
        res.render("../views/pages/product", {title: "Produit", shoppingCartCount: 5, product: productList[0], formatPrice: formatPrice });
    } catch (err) {
        res.sendStatus(err.response.status);
    }
});

router.get("/contact", (req, res) => {
    res.render("../views/pages/contact", {title: "Contact", shoppingCartCount: 5 });
});

router.get("/panier", async (req, res) => {
    
    try {
        const answer = await axios.get(`http://localhost:8000/api/shopping-cart`);
        const productList = answer.data;
        res.render("../views/pages/shopping-cart", {title: "Panier", shoppingCartCount: 5, productList: productList, formatPrice: formatPrice });
    } catch (err) {
        console.log(err);
        res.sendStatus(err.response.status);
    }
});

router.get("/commande", (req, res) => {
    res.render("../views/pages/order", {title: "Commande", shoppingCartCount: 5 });
});

router.get("/confirmation", (req, res) => {
    res.render("../views/pages/confirmation", {title: "Confirmation", shoppingCartCount: 5 });
});

module.exports = router;
