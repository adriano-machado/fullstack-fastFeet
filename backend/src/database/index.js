import Sequelize from 'sequelize';
// import mongoose from 'mongoose';

import databaseConfig from '../config/database';

import Deliveryman from '../app/models/Deliveryman';
import File from '../app/models/File';
import Recipient from '../app/models/Recipient';
import Delivery from '../app/models/Delivery';
import DeliveryProblem from '../app/models/DeliveryProblem';
import User from '../app/models/User';

const models = [User, Deliveryman, File, Recipient, Delivery, DeliveryProblem];

class Database {
    constructor() {
        this.init();
        // this.mongo();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models
            .map(model => model.init(this.connection))
            .map(
                model =>
                    model.associate && model.associate(this.connection.models)
            );
    }

    // mongo() {
    //     this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
    //         useNewUrlParser: true,
    //         useFindAndModify: true,
    //         useUnifiedTopology: true,
    //     });
    // }
}
export default new Database();
