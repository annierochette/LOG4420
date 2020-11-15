const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Product = mongoose.model('Product');


router.get('/', async (req, res) => {
    try {
        const products = await Product.find(categorySort(req.query)).sort(criteriaSort(req.query));
        
        res.send(products);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.find({id: req.params.id});
        if(product.length == 0) {
            res.sendStatus(404);
        } else {
            res.json(product);
        }
    } catch(err) {
        res.status(500)
    }
});

router.post('/', async (req, res) => {
    const product = new Product({
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        category: req.body.category,
        description: req.body.description,
        features: req.body.features
    });
    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch(err) {
        res.status(400)
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.find({ id: req.params.id });
        if(product.length == 0) {
            res.sendStatus(404)
        }
        else{
            await Product.deleteOne({id: req.params.id});
            res.sendStatus(204)
        }
    } catch(err) {
        res.status(500)
    }
});

router.delete('/', async (req, res) => {
    try {
        await Product.deleteMany({});
        res.send(204)
    } catch(err) {
        res.status(500)
    }
});

function criteriaSort(query) {
    console.log(query.criteria)
    let sort = "";
    switch(String(query.criteria)) {
        case "alpha-asc":
            sort = '{"name": 1}'
            break;
        case "alpha-dsc":
            sort = '{"name": -1}'
            break;
        case "price-dsc":
            sort = '{"price": -1}'
            break;
        default: 
            sort = '{"price": 1}'
    }
    console.log(sort)
    return JSON.parse(sort);
}

function categorySort(query) {
    let sort = "";
    switch(query.category) {
        case "cameras":
            sort = '{"category": "cameras"}'
            break;
        case "computers":
            sort = '{"category": "computers"}'
            break;
        case "consoles":
            sort = '{"category": "consoles"}'
            break;
        case "screens":
            sort = '{"category": "screens"}'
            break;
        default: 
            sort = '{}'
    }

    return JSON.parse(sort);
}

module.exports = router;