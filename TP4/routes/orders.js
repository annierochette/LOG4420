const express = require('express')
const mongoose = require('mongoose')
const { body, validationResult } = require('express-validator')
const router = express.Router()

const Order = mongoose.model('Order');

router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.send(orders);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const order = await Order.find({ id: req.params.id });
        if(order.length == 0) {
            res.sendStatus(404);
        } else {
            res.json(order);
        }
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/', [
    body('id').isInt(),
    body('firstName').isAlpha(),
    body('lastName').isAlpha(),
    body('email').isEmail(),
    body('phone').isMobilePhone("any"),
    body('products').isArray()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const order = new Order({
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        products: req.body.products
    })
    try {
        const newOrder = await order.save();
        // res.status(201).json(newOrder);
        res.sendStatus(201);
    } catch(err) {
        res.status(400)
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const product = await Order.find({ id: req.params.id });
        if(product.length == 0) {
            res.sendStatus(404)
        }
        else{
            await Order.deleteOne({id: req.params.id});
            res.sendStatus(204)
        }
    } catch(err) {
        res.status(500)
    }
});

router.delete('/', async (req, res) => {
    try {
        await Order.deleteMany({});
        res.sendStatus(204)
    } catch(err) {
        res.status(500)
    }
});

module.exports = router;