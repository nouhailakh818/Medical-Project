//medicamentCONTROLLER
const db = require('../models'); 

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

module.exports = {
  getMedicaments
};
