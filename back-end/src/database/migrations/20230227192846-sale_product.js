module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('sales_products', {
      sale_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references:{
          model: 'sales',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        unique: false,
      },
      product_id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references:{
          model: 'products',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        unique: false,
      },
      quantity:{
        type: Sequelize.INTEGER,
        allowNull: false
      }
    })
  },

  down: async (QueryInterface, _Sequelize) => {
    await QueryInterface.dropTable('sales_products');
  },
}