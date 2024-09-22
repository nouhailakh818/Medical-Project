const db = require('../models'); 

const updateLaboratoire = async (req, res) => {
  try {
    const { id } = req.params; 
    const { name, description, location, phone_number, email } = req.body;
    const image = req.file ? req.file.path : null; 

    const laboratoire = await db.laboratoire.findByPk(id);

    if (!laboratoire) {
      return res.status(404).json({ message: 'Laboratoire not found' });
    }

    const updatedLaboratoire = await laboratoire.update({
      name,
      description,
      location,
      phone_number,
      email,
      image,
    });

    res.status(200).json(updatedLaboratoire);
  } catch (error) {
    console.error('Error updating laboratoire:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



const getLaboratoires = async (req, res) => {
  try {
    const laboratoires = await db.laboratoire.findAll();
    res.status(200).json(laboratoires);
  } catch (error) {
    console.error('Error fetching laboratoires:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const getMedicationsByLabo = async (req, res) => {
  const laboId = req.params.id;
  try {
    const medications = await db.medicament.findAll({
      include: [{
        model: db.laboratoire,
        where: { id: laboId }
      }]
    });
    res.json(medications);
  } catch (error) {
    res.status(500).send('Error retrieving medications');
  }
};



module.exports = {
    updateLaboratoire,
      getLaboratoires,
      getMedicationsByLabo
};
