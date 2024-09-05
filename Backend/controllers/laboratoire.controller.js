const db = require('../models'); 





const updateLaboratoire = async (req, res) => {
  try {
    const { id } = req.params; // Get the id from URL parameters
    const { name, description, location, phone_number, email } = req.body;
    const image = req.file ? req.file.path : null; // Get image path if a file is uploaded

    // Find the existing record
    const laboratoire = await db.Laboratoire.findByPk(id);

    if (!laboratoire) {
      return res.status(404).json({ message: 'Laboratoire not found' });
    }

    // Update the record
    const updatedLaboratoire = await laboratoire.update({
      name,
      description,
      location,
      phone_number,
      email,
      image, // Update image URL or path
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

/*const getMedicationsForLaboratoire = async (req, res) => {
  try {
    const { id } = req.params;
    
    const medicaments = await medicament.findAll({
      include: {
        model: db.laboMedic,
        where: { laboratoireId: id },
        attributes: []
            
        }
    });
    res.json(medicaments);
  } catch (error) {
    console.error('Error fetching medications:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  
};*/
/*const getMedicationsForLaboratoire = async (req, res) => {
    try {
      const { id } = req.params;
  
      const medicaments = await Medicament.findAll({
        include: [{
          model: db.laboMedic,
          where: { laboratoireId: id },
          attributes: [], 
          include: [{
            model: db.laboratoire, 
            attributes: ['name', 'location_labo', 'phone_number'], 
            as: 'laboratoire' 
          }]
        }],
        attributes: ['id', 'name', 'description'] 
      });
  
      res.json(medicaments);
    } catch (error) {
      console.error('Error fetching medications:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };*/
  
  const { Medicament, Laboratoire } = require('../models');

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
      //getMedicationsForLaboratoire
      getMedicationsByLabo
};
