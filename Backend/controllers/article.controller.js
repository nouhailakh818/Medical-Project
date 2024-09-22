const db = require('../models');
const Article = db.Article;

exports.create = async (req, res) => {
  try {
    const { title, content, date_pub } = req.body;

    const imagePath = req.file ? req.file.filename : null;


    if (!title || !content) {
      return res.status(400).send({
        message: "Title and content cannot be empty!"
      });
    }

    // Create article
    const article = {
      title,
      content,
      date_pub: date_pub || new Date(),
      image: imagePath 
    };

    // Save article
    const data = await Article.create(article);
    
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the Article."
    });
  }
};



// Get all articles
exports.findAll = async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.send(articles);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving articles."
    });
  }
};

// Find single article by id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).send({
        message: `Article not found with id ${id}`
      });
    }

    res.send(article);
  } catch (error) {
    res.status(500).send({
      message: error.message || `Error retrieving Article with id ${id}`
    });
  }
};

// Update article by id
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, content, date_pub } = req.body;

    // Find the existing article to retain the previous image if no new image is uploaded
    const existingArticle = await Article.findByPk(id);

    if (!existingArticle) {
      return res.status(404).send({
        message: `Article with id ${id} not found.`
      });
    }

    const updatedImage = req.file ? req.file.filename : existingArticle.image;

    const [updated] = await Article.update(
      { title, content, date_pub, image: updatedImage }, 
      { where: { id_article: id } }
    );

    if (updated) {
      const updatedArticle = await Article.findByPk(id);
      return res.send(updatedArticle);
    }

    throw new Error(`Failed to update article with id ${id}.`);
  } catch (error) {
    res.status(500).send({
      message: error.message || `Error updating Article with id ${id}`
    });
  }
};

// Delete by id
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    const deleted = await Article.destroy({
      where: { id_article: id }
    });

    if (deleted) {
      return res.send({ message: "Article was deleted successfully!" });
    }

    throw new Error(`Article with id ${id} not found.`);
  } catch (error) {
    res.status(500).send({
      message: error.message || `Could not delete Article with id ${id}`
    });
  }
};
