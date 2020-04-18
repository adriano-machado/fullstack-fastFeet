import Mail from '../../lib/Mail';

class CancelationMail {
    get key() {
        return 'CancelationMail';
    }

    async handle({ data }) {
        const { delivery, problem } = data;
        await Mail.sendMail({
            to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
            subject: 'Entrega cancelada',
            template: 'cancelation',
            context: {
                state: delivery.recipient.state,
                city: delivery.recipient.city,
                street: delivery.recipient.street,
                number: delivery.recipient.number,
                product: delivery.product,
                description: problem.description,
                deliverymanName: delivery.deliveryman.name,
            },
        });
    }
}

export default new CancelationMail();
