module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    urlImage: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  { 
    underscored: true,
    timestamps: false,
    tableName: 'products',
    modelName: 'products',
  });

  Product.associate = (models) => {
    Product.hasMany(models.SaleProduct, {
      as: 'product',
      foreignKey: 'productId',
    });
  };

  return Product;
};