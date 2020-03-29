import Sequelize, { Model } from 'sequelize';

import { isBefore, subHours } from 'date-fns';

class Recipient extends Model {
    static init(sequelize) {
        super.init(
            {
                state: Sequelize.STRING,
                city: Sequelize.STRING,
                street: Sequelize.STRING,
                number: Sequelize.NUMBER,
                complement: Sequelize.STRING,
                cep: Sequelize.NUMBER,
            },
            {
                sequelize,
            }
        );
        return this;
    }
}

export default Recipient;
