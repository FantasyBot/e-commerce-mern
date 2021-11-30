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
// Private/Admin
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

// Create a product
// POST/api/products
// Private/Admin
const createProduct = async (req, res, next) => {
    try {
        const product = await new Product({
            name: 'Sample name',
            price: 0,
            user: req.user._id,
            image: '/images/sample.jpg',
            brand: 'Sample brand',
            category: 'Sample category',
            countInStock: 0,
            numReviews: 0,
            description: 'Sample description',
        })
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (err) {
        res.status(404);
        return next(err);
    }
}

//  Update a product
//  PUT /api/products/:id
//  Private/Admin
const updateProduct = async (req, res, next) => {
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
    } = req.body

    try {
        const product = await Product.findById(req.params.id)
        
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } catch (err) {
        res.status(404);
        return next("Product not found");
    }
}

export {
    getProductById,
    getProducts,
    deleteProduct,
    createProduct,
    updateProduct
}