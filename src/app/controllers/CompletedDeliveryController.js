import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import File from '../models/File';

import Deliveryman from '../models/Deliveryman';

class CompletedDeliveryController {
    async index(req, res) {
        const { page = 1 } = req.query;
        const deliveries = await Delivery.findAll({
            where: {
                deliveryman_id: req.params.deliverymanId,
            },
            attributes: ['id', 'product', 'ocurring', 'start_date', 'end_date'],
            limit: 20,
            offset: (page - 1) * 20,
            include: [
                {
                    model: Deliveryman,
                    as: 'deliveryman',
                    attributes: ['id', 'name', 'email'],
                    include: [
                        {
                            model: File,
                            as: 'avatar',
                            attributes: ['id', 'url', 'path'],
                        },
                    ],
                },
                {
                    model: Recipient,
                    as: 'recipient',
                    attributes: [
                        'id',
                        'state',
                        'city',
                        'street',
                        'number',
                        'complement',
                        'cep',
                    ],
                },
                {
                    model: File,
                    as: 'signature',
                    attributes: ['id', 'url', 'path'],
                },
            ],
        });
        const finishedDeliveries = deliveries.filter(
            delivery => !!delivery.end_date
        );
        return res.json(finishedDeliveries);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            deliveryman_id: Yup.number().required(),
            signature_id: Yup.date().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const delivery = await Delivery.findByPk(req.params.deliveryId);

        if (!delivery) {
            return res.status(400).json({ error: "Delivery doesn't exists" });
        }

        if (req.body.deliveryman_id !== delivery.deliveryman_id) {
            return res.status(401).json({
                error: "You don't have permission to finish this delivery",
            });
        }

        if (!delivery.start_date) {
            return res.status(400).json({
                error: "You can't finish a non started delivery",
            });
        }
        const { signature_id, deliveryman_id } = req.body;
        const { id, start_date, end_date } = await delivery.update({
            end_date: new Date(),
            signature_id,
        });
        return res.json({
            id,
            start_date,
            signature_id,
            deliveryman_id,
            end_date,
        });
    }
}

export default new CompletedDeliveryController();
