import * as Yup from 'yup';
import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import NewDeliveryMail from '../jobs/NewDeliveryMail';
import Queue from '../../lib/Queue';

class DeliveryController {
    async index(req, res) {
        const { page = 1, q } = req.query;
        const query = {
            attributes: [
                'id',
                'product',
                'start_date',
                'canceled_at',
                'end_date',
                'status',
            ],
            order: ['created_at'],
            limit: 20,
            offset: (page - 1) * 20,
            include: [
                {
                    model: File,
                    as: 'signature',
                    attributes: ['id', 'url', 'path'],
                },
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
        };

        if (q) {
            query.where = {
                product: {
                    [Op.iLike]: `%${q}%`,
                },
            };
        }
        const deliveries = await Delivery.findAll(query);
        return res.json(deliveries);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            recipient_id: Yup.number().required(),
            deliveryman_id: Yup.number().required(),
            product: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const {
            id,
            product,
            recipient_id,
            deliveryman_id,
        } = await Delivery.create(req.body);

        const delivery = await Delivery.findByPk(id, {
            include: [
                { model: Recipient, as: 'recipient' },
                {
                    model: Deliveryman,
                    as: 'deliveryman',
                    attributes: ['id', 'name', 'email'],
                },
            ],
        });
        Queue.add(NewDeliveryMail.key, { delivery });

        return res
            .status(200)
            .json({ id, product, recipient_id, deliveryman_id });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            recipient_id: Yup.number(),
            deliveryman_id: Yup.number(),
            product: Yup.string(),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }
        const delivery = await Delivery.findByPk(req.params.deliveryId);

        if (!delivery) {
            return res.status(400).json({ error: "Delivery doesn't exists" });
        }

        if (delivery.start_date) {
            return res
                .status(401)
                .json({ error: "You can't update a started delivery" });
        }

        if (delivery.end_date) {
            return res
                .status(401)
                .json({ error: "You can't update a finished delivery" });
        }

        if (delivery.canceled_at) {
            return res
                .status(401)
                .json({ error: "You can't update a canceled delivery" });
        }

        const {
            id,
            product,
            recipient_id,
            deliveryman_id,
        } = await delivery.update(req.body);
        return res
            .status(200)
            .json({ id, product, recipient_id, deliveryman_id });
    }

    async delete(req, res) {
        const delivery = await Delivery.findByPk(req.params.deliveryId);

        if (!delivery) {
            return res.status(400).json({ error: "Delivery doesn't exists" });
        }
        if (delivery.start_date) {
            return res
                .status(401)
                .json({ error: "You can't delete a started delivery" });
        }

        if (delivery.end_date) {
            return res
                .status(401)
                .json({ error: "You can't delete a finished delivery" });
        }

        if (delivery.canceled_at) {
            return res
                .status(401)
                .json({ error: "You can't delete a canceled delivery" });
        }
        await delivery.destroy();
        return res.status(204).json();
    }
}
export default new DeliveryController();
