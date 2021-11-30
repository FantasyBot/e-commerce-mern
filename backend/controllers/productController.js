import Product from '../models/productModel.js'


// Get all products
// GET/
// Public
const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find({})
        return res.json(products);
    } catch (err) {
        return next(err);
    }
}

// Get a product
// GET/:id
// Public
const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        return res.json(product);
    } catch (err) {
        return next(err);
    }
}


// Delete a product
// DELETE/api/products/:id
// Private/Admin API
const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        await product.remove();
        res.json({ message: 'Product removed' });
    } catch (err) {
        console.log(err)
        res.status(404);
        return next("User not exists");
    }
}


export {
    getProductById,
    getProducts,
    deleteProduct
}