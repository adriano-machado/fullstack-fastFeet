import Sequelize, { Model } from 'sequelize';

class Delivery extends Model {
    static init(sequelize) {
        super.init(
            {
                product: Sequelize.STRING,
                canceled_at: Sequelize.DATE,
                start_date: Sequelize.DATE,
                end_date: Sequelize.DATE,
                status: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        if (this.canceled_at) return 'cancelada';

                        if (this.end_date) return 'entregue';
                        if (this.start_date) return 'retirada';
                        return 'pendente';
                    },
                },
            },
            {
                sequelize,
            }
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.File, {
            foreignKey: 'signature_id',
            as: 'signature',
        });
        this.belongsTo(models.Deliveryman, {
            foreignKey: 'deliveryman_id',
            as: 'deliveryman',
        });
        this.belongsTo(models.Recipient, {
            foreignKey: 'recipient_id',
            as: 'recipient',
        });
    }
}

export default Delivery;
