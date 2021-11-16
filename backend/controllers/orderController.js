// import asyncHandler from 'express-async-handler';
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

export { addOrderItems }
