const db = require('../models'); 
const { Medicament } = require('../models/medicament.models'); 

const getMedicaments = async (req, res) => {
  try {
    if (!db.medicament) {
      throw new Error('Medicament model is not defined');
    }

    const medicaments = await db.medicament.findAll();
    res.status(200).json(medicaments);
  } catch (error) {
    console.error('Error fetching medicaments:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const updateMedicament = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity, expiration_date, type } = req.body;
  try {
    const medicament = await db.medicament.findByPk(id); 
    if (!medicament) {
      return res.status(404).json({ message: 'Medicament not found' });
    }

    await medicament.update({
      name,
      description,
      price,
      quantity,
      expiration_date,
      type
    });

    res.json({ message: 'Medicament updated successfully', medicament });
  } catch (error) {
    console.error('Error updating medicament:', error);
    res.status(500).json({ message: 'Error updating medicament', error });
  }
};

const deleteMedicament = async (req, res) => {
  const { id } = req.params;

  try {
    const medicament = await db.medicament.findByPk(id); 
    if (!medicament) {
      return res.status(404).json({ message: 'Medicament not found' });
    }

    await medicament.destroy(); 

    res.json({ message: 'Medicament deleted successfully' });
  } catch (error) {
    console.error('Error deleting medicament:', error);
    res.status(500).json({ message: 'Failed to delete medicament' });
  }
};

module.exports = {
  getMedicaments,
  updateMedicament,
  deleteMedicament
};
