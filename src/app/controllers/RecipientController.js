import * as Yup from 'yup';
import { Op } from 'sequelize';

import Recipient from '../models/Recipient';

class RecipientController {
    async index(req, res) {
        const { page = 1, q } = req.query;
        const query = {
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
            order: [['created_at', 'ASC']],
            limit: 20,
            offset: (page - 1) * 20,
        };

        if (q) {
            query.where = {
                name: {
                    [Op.iLike]: `%${q}%`,
                },
            };
        }
        const recipients = await Recipient.findAll(query);
        return res.json(recipients);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            state: Yup.string().required(),
            city: Yup.string().required(),
            street: Yup.string().required(),
            number: Yup.number().required(),
            complement: Yup.string(),
            name: Yup.string().required(),

            cep: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const recipientExists = await Recipient.findOne({
            where: { cep: req.body.cep },
        });
        if (recipientExists) {
            return res.status(400).json({ error: 'Recipient already exists' });
        }
        const recipient = await Recipient.create(req.body);
        const {
            state,
            city,
            street,
            complement,
            cep,
            number,
            id,
            name,
        } = recipient;
        return res
            .status(201)
            .json({ id, state, city, street, complement, cep, number, name });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            state: Yup.string(),
            city: Yup.string(),
            street: Yup.string(),
            number: Yup.number(),
            complement: Yup.string(),
            name: Yup.string(),
            cep: Yup.string(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const recipient = await Recipient.findByPk(req.params.recipientId);
        if (!recipient) {
            return res.status(400).json({ error: "Recipient doesn't exists" });
        }
        if (req.body.cep && req.body.cep !== recipient.cep) {
            const recipientExists = await Recipient.findOne({
                where: { cep: req.body.cep },
            });
            if (recipientExists) {
                return res
                    .status(400)
                    .json({ error: 'Recipient already exists' });
            }
        }

        const {
            state,
            city,
            street,
            complement,
            cep,
            number,
            id,
            name,
        } = await recipient.update(req.body);
        return res.json({
            id,
            state,
            city,
            street,
            complement,
            cep,
            number,
            name,
        });
    }

    async delete(req, res) {
        const recipient = await Recipient.findByPk(req.params.recipientId);

        if (!recipient) {
            return res.status(400).json({ error: "recipient doesn't exists" });
        }
        await recipient.destroy();

        return res.status(204).json();
    }

    async show(req, res) {
        const recipient = await Recipient.findByPk(req.params.recipientId);
        if (!recipient) {
            return res.status(400).json({ error: "Recipient doesn't exists" });
        }
        return res.json(recipient);
    }
}

export default new RecipientController();
