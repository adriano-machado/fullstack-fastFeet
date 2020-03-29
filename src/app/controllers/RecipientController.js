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
            cep: Yup.number().required(),
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

        return res.json(recipient);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            state: Yup.string(),
            city: Yup.string(),
            street: Yup.string(),
            number: Yup.number(),
            complement: Yup.string(),
            cep: Yup.number(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }
        const { cep } = req.body;

        const recipient = await Recipient.findByPk(req.params.recipientId);

        if (cep && cep !== recipient.cep) {
            const recipientExists = await Recipient.findOne({
                where: { cep },
            });
            if (recipientExists) {
                return res
                    .status(400)
                    .json({ error: 'Recipient already exists' });
            }
        }

        await recipient.update(req.body);

        return res.json(recipient);
    }
}

export default new RecipientController();
