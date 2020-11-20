const express = require('express')
const mongoose = require('mongoose')
const validator = require('validator')
const { body, validationResult } = require('express-validator')
const router = express.Router()

const Order = mongoose.model('Order');
const Product = mongoose.model('Product');

router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        if(orders.length == 0){
            res.status(200).json([]);
        } else {
            res.status(200).json(orders);
        }
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
            res.status(200).json(order[0]);
        }
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/', [
    body('id').isInt({ min: 1 }),
    body('firstName').isAlpha('fr-FR'),
    body('lastName').isAlpha('fr-FR'),
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
        const idExist = await Order.exists({id: req.body.id});
        // if(idExist || !areProductsValid(req.body.products)){
        //     res.status(400);
        // }
        if(idExist){
            return res.sendStatus(400);
        }

        const newOrder = await order.save();
        res.status(201).json(newOrder);
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

// async function areProductsValid(products) {
    
//     if(products.length == 0) {
//         return false;
//     }
    
//     await products.forEach(prod => {
//         const idExist = Product.exists({ id: prod.id });
//         if(!prod.id.isInt()|| !prod.quantity.isInt({ min: 0 }) || !idExist) {
//             return false;
//         }

//     });

//     return true;
// }

module.exports = router;