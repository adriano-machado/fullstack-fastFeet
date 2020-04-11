import * as Yup from 'yup';
import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';

import Queue from '../../lib/Queue';
import CancelationMail from '../jobs/CancelationMail';
import Recipient from '../models/Recipient';

class DeliveryProblemController {
    async index(req, res) {
        const { page = 1 } = req.query;
        const problemsDelivery = await DeliveryProblem.findAll({
            attributes: ['id', 'description'],
            limit: 20,
            offset: (page - 1) * 20,
            include: [
                {
                    model: Delivery,
                    as: 'delivery',
                    attributes: ['id', 'product', 'status', 'recipient_id'],
                },
            ],
        });
        return res.json(problemsDelivery);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            description: Yup.string().required(),
            deliveryman_id: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const deliveryExists = await Delivery.findByPk(req.params.deliveryId);

        if (!deliveryExists) {
            return res.status(400).json({ error: "Delivery doesn't exists" });
        }

        if (deliveryExists.deliveryman_id !== req.body.deliveryman_id) {
            return res.status(401).json({
                error:
                    "You don't have permission to create a problem to this delivery",
            });
        }

        const { id, delivery_id, description } = await DeliveryProblem.create({
            delivery_id: req.params.deliveryId,
            description: req.body.description,
        });

        return res.status(200).json({ id, delivery_id, description });
    }

    async delete(req, res) {
        const problem = await DeliveryProblem.findByPk(req.params.problemId);
        const delivery = await Delivery.findByPk(problem.delivery_id, {
            include: [
                {
                    model: Deliveryman,
                    as: 'deliveryman',
                },
                {
                    model: Recipient,
                    as: 'recipient',
                },
            ],
        });

        delivery.canceled_at = new Date();
        await delivery.save();

        Queue.add(CancelationMail.key, { delivery, problem });

        return res.json(delivery);
    }

    async show(req, res) {
        const { page = 1 } = req.query;
        const problemsDelivery = await DeliveryProblem.findAll({
            where: {
                delivery_id: req.params.deliveryId,
            },
            attributes: ['id', 'description'],
            limit: 20,
            offset: (page - 1) * 20,
            include: [
                {
                    model: Delivery,
                    as: 'delivery',
                    attributes: ['id', 'product', 'status', 'recipient_id'],
                },
            ],
        });
        return res.json(problemsDelivery);
    }
}
export default new DeliveryProblemController();
