import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
    static init(sequelize) {
        super.init(
            {
                state: Sequelize.STRING,
                city: Sequelize.STRING,
                street: Sequelize.STRING,
                number: Sequelize.NUMBER,
                complement: Sequelize.STRING,
                cep: Sequelize.STRING,
                name: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );
        return this;
    }
}

export default Recipient;
