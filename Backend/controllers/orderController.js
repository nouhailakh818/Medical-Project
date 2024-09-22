const { Order, OrderItem, Facture } = require('../models');

exports.createOrder = async (req, res) => {
  try {
    const { cartItems, totalPrice, userId } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: 'No cart items provided' });
    }
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const newOrder = await Order.create({
      totalPrice,
      userId, 
    });

    const orderItems = cartItems.map(item => ({
      orderId: newOrder.id,
      medicamentId: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    await OrderItem.bulkCreate(orderItems);

    const newFacture = await Facture.create({
      orderId: newOrder.id,
      userId, 
    });

    await Order.update(
      { factureId: newFacture.id },
      { where: { id: newOrder.id } }
    );

    res.status(201).json({
      message: 'Order and facture created successfully',
      order: newOrder,
      facture: newFacture,
    });
  } catch (error) {
    console.error('Failed to create order and facture:', error);
    res.status(500).json({ message: 'Failed to create order and facture', error: error.message });
  }
};

// Fetch all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: OrderItem, as: 'items' }],
    });
    res.json(orders);
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};

// Fetch a single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({
      where: { id },
      include: [
        { model: OrderItem, as: 'items' },
        { model: Facture, as: 'facture' },
      ],
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Failed to fetch order:', error);
    res.status(500).json({ message: 'Failed to fetch order', error: error.message });
  }
};

// Update an existing order
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { totalPrice, status } = req.body;

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await Order.update(
      { totalPrice, status },
      { where: { id } }
    );

    const updatedOrder = await Order.findOne({
      where: { id },
      include: [
        { model: OrderItem, as: 'items' },
        { model: Facture, as: 'facture' },
      ],
    });

    res.json({ message: 'Order updated successfully', order: updatedOrder });
  } catch (error) {
    console.error('Failed to update order:', error);
    res.status(500).json({ message: 'Failed to update order', error: error.message });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Order.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Failed to delete order:', error);
    res.status(500).json({ message: 'Failed to delete order', error: error.message });
  }
};

// Validate an order
exports.validateOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const [updated] = await Order.update(
      { status: 'validated' },
      { where: { id } }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order validated successfully' });
  } catch (error) {
    console.error('Failed to validate order:', error);
    res.status(500).json({ message: 'Failed to validate order', error: error.message });
  }
};
