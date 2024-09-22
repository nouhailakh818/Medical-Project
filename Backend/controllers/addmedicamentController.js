const db = require("../models");
const Medicament = db.medicament;
const { Op } = require("sequelize");

exports.addMedicament = async (req, res) => {
  const { name, description, price, quantity, expiration_date, type } =
    req.body;

  try {
    let medicament = await Medicament.findOne({
      where: {
        type: {
          [Op.iLike]: type,
        },
      },
    });

    if (medicament) {
      medicament.name = name;
      medicament.description = description;
      medicament.price = price;
      medicament.quantity = quantity;
      medicament.expiration_date = expiration_date;

      await medicament.save();

      res.status(200).json({ message: "Médicament mis à jour", medicament });
    } else {
      const newMedicament = await Medicament.create({
        name,
        description,
        price,
        quantity,
        expiration_date,
        type,
      });

      res.status(201).json(newMedicament);
    }
  } catch (error) {
    console.error(
      "Erreur lors de l'ajout ou de la mise à jour du médicament :",
      error
    );
    res
      .status(500)
      .json({
        message: "Erreur lors de l'ajout ou de la mise à jour du médicament",
        error,
      });
  }
};
