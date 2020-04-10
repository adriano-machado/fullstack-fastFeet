module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('recipients', 'name', {
            type: Sequelize.STRING,
            allowNull: true,
        });
    },

    down: queryInterface => {
        return queryInterface.removeColumn('recipients', 'name');
    },
};
