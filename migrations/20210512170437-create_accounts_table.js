'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("accounts",{
      id:{
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey:true,
        allowNull: false
      },
      uid:{
        type: Sequelize.STRING,
        allowNull:false
      },
      email:{
        type: Sequelize.STRING,
        allowNull:false,
        unique: true
      },
      name:{
        type: Sequelize.STRING,
        allowNull:false,
      },
      password:{
        type: Sequelize.STRING,
        allowNull:false
      },
      createdAt:{
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt:{
        type: Sequelize.DATE
      },
      deletedAt:{
        type: Sequelize.DATE
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('accounts');
  }
};
