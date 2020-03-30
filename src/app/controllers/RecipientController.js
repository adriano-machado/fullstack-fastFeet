import * as Yup from 'yup';
// import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
// import pt from 'date-fns/locale/pt';

import Recipient from '../models/Recipient';

class RecipientController {
    async store(req, res) {
        const schema = Yup.object().shape({
            state: Yup.string().required(),
            city: Yup.string().required(),
            street: Yup.string().required(),
            number: Yup.number().required(),
            complement: Yup.string().required(),
            cep: Yup.number().test(
                'len',
                'Cep must be exactly 8 characters',
                val => val.toString().length === 8
            ),
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
        const { state, city, street, complement, cep, number, id } = recipient;
        return res
            .status(201)
            .json({ id, state, city, street, complement, cep, number });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            state: Yup.string(),
            city: Yup.string(),
            street: Yup.string(),
            number: Yup.number(),
            complement: Yup.string(),
            cep: Yup.number().test(
                'len',
                'Cep must be exactly 8 characters',
                val => val.toString().length === 8
            ),
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
        } = await recipient.update(req.body);
        return res.json({
            id,
            state,
            city,
            street,
            complement,
            cep,
            number,
        });
    }
}

export default new RecipientController();
