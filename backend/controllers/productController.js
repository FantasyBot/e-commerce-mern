import Product from '../models/productModel.js'

const getProducts = (req, res, next) => {
    Product.find({})
        .then((products) => {
            return res.json(products);
        }) 
        .catch((err) => {
            next(err);
        })
}

const getProductById = (req, res, next) => {
    Product.findById(req.params.id)
        .then((product) => {
            return res.json(product)
        })
        .catch((err) => {
            next(err);
        })
}

export {
    getProductById,
    getProducts
}