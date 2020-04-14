import * as Yup from 'yup';
import { startOfDay, parseISO, endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import File from '../models/File';

import Deliveryman from '../models/Deliveryman';

class ScheduleController {
    async index(req, res) {
        const { page = 1 } = req.query;

        const deliveries = await Delivery.findAll({
            where: {
                deliveryman_id: req.params.deliverymanId,
                canceled_at: null,
                end_date: null,
            },
            attributes: ['id', 'product', 'status', 'start_date'],
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
                        'name',
                    ],
                },
            ],
        });
        return res.json(deliveries);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            deliveryman_id: Yup.number().required(),
            date: Yup.date().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const delivery = await Delivery.findByPk(req.params.deliveryId, {
            include: [
                {
                    model: Recipient,
                    as: 'recipient',
                    attributes: [
                        'id',
                        'state',
                        'city',
                        'street',
                        'number',
                        'cep',
                        'complement',
                        'name',
                    ],
                },
            ],
        });

        if (!delivery) {
            return res.status(400).json({ error: "Delivery doesn't exists" });
        }

        const { deliveryman_id, date } = req.body;

        if (deliveryman_id !== delivery.deliveryman_id) {
            return res.status(401).json({
                error: "You don't have permission to start this delivery",
            });
        }

        if (delivery.end_date || delivery.canceled_at) {
            return res.status(401).json({
                error: 'This delivery is already finished or canceled',
            });
        }

        const parsedDate = parseISO(date);
        const deliveries = await Delivery.findAll({
            where: {
                deliveryman_id,
                start_date: {
                    [Op.between]: [
                        startOfDay(parsedDate),
                        endOfDay(parsedDate),
                    ],
                },
            },
        });

        if (deliveries.length >= 5) {
            return res.status(401).json({
                error:
                    'You already started 5 deliveries today, you must wait until tomorrow to start more deliveries',
            });
        }

        delivery.start_date = new Date();
        const {
            id,
            product,
            start_date,
            recipient,
            status,
        } = await delivery.save();
        return res.json({
            id,
            product,
            start_date,
            recipient,
            deliveryman_id,
            status,
        });
    }
}

export default new ScheduleController();
