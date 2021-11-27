import Order from '../models/orderModel.js';

// Create new order
// POST/api/orders
// Private
const addOrderItems = async (req, res, next) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body

    try {
        if (orderItems && orderItems.length === 0) {
            res.status(400)
            return next('No order items')
        } else {
            const order = new Order({
                orderItems,
                user: req.user._id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
            })

            const createdOrder = await order.save()
            res.status(201).json(createdOrder)
        }

    } catch (err) {
        res.status(400);
        return next(err.message)
    }
}


// Create order by ID
// GET/api/orders:id
// Private
const getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate(
            'user',
            'name email'
        );
        res.json(order)
    } catch (err) {
        console.log(err.message)
        res.status(404);
        return next("Order not found")
    }
}

export { addOrderItems, getOrderById }
