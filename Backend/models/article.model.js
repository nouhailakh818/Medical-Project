const { DataTypes } = require('sequelize');

module.exports = (Sequelize) => {
  const Article = Sequelize.define('Article', {
    id_article: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date_pub: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'article',
    timestamps: false
  });

  return Article;  
};
