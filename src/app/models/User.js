import Sequelize, { Model } from 'sequelize';

import bcrypt from 'bcryptjs';

class User extends Model {
    static init(sequelize) {
        // Init recebee a conexão como segundo parâmetro
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                // VIRTUAL para campos que não vão existir efetivamente na base
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );
        this.addHook('beforeSave', async user => {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });
        return this;
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
}

export default User;
