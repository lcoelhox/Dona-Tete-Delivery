module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type:DataTypes.DECIMAL,
      allowNull: false
    },
    deliveryAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deliveryNumber: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    saleDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },  
    status: {
      type: DataTypes.STRING, 
      allowNull: false,
      defaultValue: 'Pendente',
    }
  },
  {
    timestamps: false,
    underscored: true,
    tableName: 'sales',
    modelName: 'sales',
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, {
      foreignKey: 'userId', as: 'user'
    });

    Sale.belongsTo(models.User, {
      foreignKey: 'sellerId', as: 'seller'
    });

    Sale.hasMany(models.SaleProduct, {
      foreignKey: 'saleId', as: 'sale'
    });
  }

  return Sale;
};