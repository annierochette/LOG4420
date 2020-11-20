const express = require('express')
const mongoose = require('mongoose')
const { body, validationResult } = require('express-validator')
const router = express.Router()

const Product = mongoose.model('Product');
const criterias = ["alpha-asc", "alpha-dsc", "price-asc", "price-dsc"];
const categories = ["screens", "cameras", "computers", "consoles"];


router.get('/', async (req, res) => {
    if(!criterias.includes(String(req.query.criteria)) && req.query.criteria != undefined ) {
        res.status(400);
    }
    if(!categories.includes(String(req.query.category)) && req.query.category != undefined ) {
        res.status(400);
    }

    try {
        const products = await Product.find(categorySort(req.query)).collation({ locale: "en" }).sort(criteriaSort(req.query));
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

router.post('/', [
    body('id').isInt({ min: 1 }),
    body('name').notEmpty(),
    body('price').isFloat(),
    body('image').notEmpty(),
    body('category').isAlpha(),
    body('description').notEmpty(),
    body('features').isArray({ min: 2 }),
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty() || !categories.includes(req.body.category)) {
        return res.status(400).json({ errors: errors.array() });
    }

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
        res.sendStatus(204)
    } catch(err) {
        res.sendStatus(500)
    }
});

function criteriaSort(query, res) {
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
    return JSON.parse(sort);
}

function categorySort(query, res) {
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
            sort = '{}';
    }

    return JSON.parse(sort);
}

module.exports = router;