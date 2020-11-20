const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const { body, validationResult } = require('express-validator')
const router = express.Router()

const Product = mongoose.model('Product');

router.get('/', (req, res) => {
    if(req.session.panier == undefined){
        req.session.panier = [];
    }
    res.status(200).json(req.session.panier);
});

router.get('/:productId', (req, res) => {
    if(req.session.panier) {
        req.session.panier.forEach(prod => {
            if(prod.productId == req.params.productId) {
                res.status(200).json(prod);
            } else {
                res.sendStatus(404);
            }
        });

    } else {
        res.sendStatus(404);
    }
});

router.post('/', [
    body('productId').isInt({ min: 1 }),
    body('quantity').isInt({ min: 1 }),
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const idExist = await Product.exists({id: req.body.productId});
        if(!idExist){
            return res.status(400);
        }
    } catch(err) {
        res.status(500);
    }

    let panier = req.session.panier;
    const product = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }

    if(!panier) {
        req.session.panier = [product];
    } else {
        if(panier.some(i => i.productId === req.body.productId)) {
            panier.forEach(prod => {
              if(prod.productId === req.body.productId) {
                const newQty = Number(req.body.quantity) + Number(prod.quantity);
                prod.quantity = newQty;
              }
            });
          } else {
            panier.push(product);
            req.session.panier = panier;
          }
    }
    
    res.sendStatus(201);
});

router.put('/:productId', [ 
    body('quantity').isInt({ min: 1 })
] ,(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const panier = req.session.panier;
    let pIndex = -1;
    panier.forEach(prod => {
        if(prod.productId === Number(req.params.productId)) {
          pIndex = prod.indexOf();
        }
    });
    if(pIndex === -1){
        res.sendStatus(404);
    } else {
        panier[pIndex].quantity += req.body.quantity;
        req.session.panier = panier;
        res.sendStatus(204)
    }
});

router.delete('/:productId', (req, res) => {
    const panier = req.session.panier;
    let pIndex = -1;

    if(!req.session.panier){
        return res.status(404);
    }

    panier.forEach(prod => {
        if(prod.productId == Number(req.params.productId)) {
          pIndex = prod.indexOf();
        }
    });
    if(pIndex === -1){
        res.status(404);
    } else {
        const newPanier = panier.splice(pIndex, 1);
        req.session.panier = newPanier;
        res.status(204);
    }
});

router.delete('/', (req, res) => {
    req.session.panier = [];
    res.sendStatus(204);
});

module.exports = router;