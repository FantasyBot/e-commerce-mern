import Product from '../models/productModel.js'
// import asyncHandler from 'express-async-handler'

// const getProducts = asyncHandler(async (req, res) => {
//     const products = await Product.find({})
//     res.json(products);
// })
// const getProductById = asyncHandler(async (req, res) => {
//     const product = await Product.findById(req.params.id)
//     if (product) {
//         res.json(product)
//     } else {
//         res.status(404)
//         throw new Error('Product not found')
//     }
// })

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
        .catch(() => {
            next(err);
        })
}

export {
    getProductById,
    getProducts
}