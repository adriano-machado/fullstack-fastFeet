import * as Yup from 'yup';
import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
    async index(req, res) {
        const { page = 1, q } = req.query;
        const query = {
            attributes: ['id', 'email', 'name', 'created_at'],
            order: [['created_at', 'DESC']],
            limit: 6,
            offset: (page - 1) * 6,
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['url', 'id', 'path'],
                },
            ],
        };
        if (q) {
            query.where = {
                name: {
                    [Op.iLike]: `%${q}%`,
                },
            };
        }
        const deliverymans = await Deliveryman.findAll(query);
        return res.json(deliverymans);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            avatar_id: Yup.number(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const deliverymanExists = await Deliveryman.findOne({
            where: { email: req.body.email },
        });
        if (deliverymanExists) {
            return res
                .status(400)
                .json({ error: 'Deliveryman already exists' });
        }
        const deliveryman = await Deliveryman.create(req.body);
        const { id, name, email, avatar_id } = deliveryman;

        return res.status(200).json({ id, name, email, avatar_id });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            avatar_id: Yup.number(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const deliveryman = await Deliveryman.findByPk(
            req.params.deliverymanId
        );

        if (req.body.email && req.body.email !== deliveryman.email) {
            const deliverymanExists = await Deliveryman.findOne({
                where: { email: req.body.email },
            });
            if (deliverymanExists) {
                return res
                    .status(400)
                    .json({ error: ' Deliveryman alreadys exists' });
            }
        }

        const { id, name, email, avatar_id } = await deliveryman.update(
            req.body
        );

        return res.status(200).json({ id, name, email, avatar_id });
    }

    async delete(req, res) {
        const deliveryman = await Deliveryman.findByPk(
            req.params.deliverymanId
        );

        if (!deliveryman) {
            return res
                .status(400)
                .json({ error: "Deliveryman doesn't exists" });
        }
        await deliveryman.destroy();

        return res.status(204).json();
    }

    async show(req, res) {
        const deliveryman = await Deliveryman.findByPk(
            req.params.deliverymanId,
            {
                attributes: ['id', 'email', 'name', 'created_at'],

                include: [
                    {
                        model: File,
                        as: 'avatar',
                        attributes: ['url', 'id', 'path'],
                    },
                ],
            }
        );
        if (!deliveryman) {
            return res
                .status(400)
                .json({ error: "Deliveryman doesn't exists" });
        }
        return res.json(deliveryman);
    }
}
export default new DeliverymanController();
