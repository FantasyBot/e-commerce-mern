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

//  Update order to paid
//  GET /api/orders/:id/pay
//  Private
const updateOrderToPaid = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id)
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        }

        const updatedOrder = await order.save()
        res.json(updatedOrder)

    } catch (error) {
        console.log(error);
        res.status(404);
        return next('Order not found');
    }
}

//  Get logged in user orders
//  GET /api/orders/myorders
//  Private
const getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user._id })
        res.json(orders)
    } catch (err) {
        res.status(404);
        return next(err);
    }
}

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders }
