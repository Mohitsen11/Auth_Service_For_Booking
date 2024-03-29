'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('Roles', [
        {
        name: 'customer',
        createdAt: new Date(),
        updatedAt: new Date()
        },
        {
          name: 'admin',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'flight_company',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
