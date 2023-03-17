module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(4,2),
        allowNull: false,
      },
      url_image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    })
  },

  down: async (QueryInterface, _Sequelize) => {
    await QueryInterface.dropTable('products');
  },
}