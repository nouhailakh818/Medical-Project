const { Facture, Order, User } = require('../models');

exports.getAllFactures = async (req, res) => {
  try {
    const factures = await Facture.findAll({
      include: [
        {
          model: Order,
          as: 'order', // Use the alias specified in the association
        },
        {
          model: User,
          as: 'user', // Use the alias specified in the association
        },
      ],
    });
    res.json(factures);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch factures', error: error.message });
  }
};

// Create a new facture and link it to an order
exports.createFacture = async (req, res) => {
  try {
    const { orderId, userId } = req.body;


    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }


    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(400).json({ message: 'Order not found' });
    }

   
    const newFacture = await Facture.create({
      orderId,
      userId,
    });

  
    await Order.update(
      { factureId: newFacture.id },
      { where: { id: orderId } }
    );

    res.status(201).json({ message: 'Facture created successfully', facture: newFacture });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create facture', error: error.message });
  }
};





exports.validateFacture = async (req, res) => {
  const factureId = req.params.factureId;
  console.log(`Validating facture with ID: ${factureId}`);
  
  try {
    // Fetch the facture with associated user
    const facture = await Facture.findByPk(factureId, {
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
    });
    
    if (!facture) {
      console.log('Facture not found');
      return res.status(404).json({ message: 'Facture not found' });
    }

    // Update facture status to validated
    facture.status = 'validated';
    await facture.save();
    console.log('Facture status updated');

    // Respond with the validated facture
    res.json({
      message: 'Facture validated successfully',
      facture,
    });
  } catch (error) {
    console.error('Error validating facture:', error);
    res.status(500).json({ message: 'Error validating facture', error: error.message });
  }
};




// Cancel a facture




// Delete a facture
exports.deleteFacture = async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch the facture to ensure it exists
    const facture = await Facture.findByPk(id);
    if (!facture) {
      return res.status(404).json({ message: 'Facture not found' });
    }

    // Fetch and update or delete associated orders
    await Order.update(
      { factureId: null }, // Set factureId to null if orders can exist without a facture
      { where: { factureId: id } }
    );

    // Now delete the facture
    await facture.destroy();

    res.status(200).json({ message: 'Facture deleted successfully' });
  } catch (error) {
    console.error('Error deleting facture:', error);
    res.status(500).json({ message: 'Failed to delete facture', error: error.message });
  }
};

  


