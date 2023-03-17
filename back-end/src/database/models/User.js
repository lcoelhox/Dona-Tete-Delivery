module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'customer',
    }
  },
  {
    timestamps: false,
    tableName: 'users',
    modelName: 'users',
  });

  User.associate = (models) => {
    User.hasMany(models.Sale, { 
      foreignKey: 'userId', as: 'user'
    });

    User.hasMany(models.Sale, { 
      foreignKey: 'sellerId', as: 'seller'
    });
  };

  return User;
};