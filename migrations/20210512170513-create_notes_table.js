'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("notes",{
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
      content:{
        type: Sequelize.STRING,
        allowNull:false
      },
      date:{
        type: Sequelize.DATE,
        allowNull: false
      },
      time:{
        type: Sequelize.TIME,
        allowNull: false
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
     await queryInterface.dropTable('notes');
  }
};
