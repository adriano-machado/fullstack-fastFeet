import Mail from '../../lib/Mail';

class NewDeliveryMail {
    get key() {
        return 'DeliveryMail';
    }

    async handle({ data }) {
        const { delivery } = data;
        await Mail.sendMail({
            to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
            subject: 'Nova entrega disponível',
            template: 'delivery',
            context: {
                deliverymanName: delivery.deliveryman.name,
                state: delivery.recipient.state,
                city: delivery.recipient.city,
                street: delivery.recipient.street,
                number: delivery.recipient.number,
                complement: delivery.recipient.complement,
                product: delivery.product,
            },
        });
    }
}

export default new NewDeliveryMail();
