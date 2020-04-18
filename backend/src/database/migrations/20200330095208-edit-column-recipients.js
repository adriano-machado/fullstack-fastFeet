module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn('recipients', 'cep', {
            type: Sequelize.STRING,
            allowNull: false,
        });
    },

    down: queryInterface => {
        return queryInterface.changeColumn('recipients', 'cep', {
            type: 'integer USING CAST(cep AS integer)',
            allowNull: false,
        });
    },
};
