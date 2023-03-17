module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    saleId: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      foreignKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  },
  {
    timestamps: false,
    underscored: true,
    tableName: 'sales_products',
    modelName: 'sales_products'
  });


  SaleProduct.associate = (models) => {
    SaleProduct.belongsTo(models.Product, {
      as: 'product',
      through: SaleProduct,
      foreignKey: 'productId',
    });

    SaleProduct.belongsTo(models.Sale, {
      as: 'sale',
      through: SaleProduct,
      foreignKey: 'saleId',
    });
  };

  return SaleProduct;
};