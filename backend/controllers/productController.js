import Product from '../models/productModel.js'
// import asyncHandler from 'express-async-handler'


const getProducts = (async (req, res) => {
    const products = await Product.find({})
    //Error cousing
    // res.status(401)
    // throw new Error('Not Auth');
    res.json(products);
})

const getProductById = (async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})


export {
    getProductById,
    getProducts
}