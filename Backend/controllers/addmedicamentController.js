const db = require('../models');
const Medicament = db.medicament; 

exports.addMedicament = async (req, res) => {
  const { name, description, price, quantity, expiration_date, type } = req.body;

  try {
    const newMedicament = await Medicament.create({
      name,
      description,
      price,
      quantity,
      expiration_date,
      type
    });

    res.status(201).json(newMedicament);
  } catch (error) {
    console.error('Error adding medicament:', error);
    res.status(500).json({ message: 'Error adding medicament', error });
  }
};
