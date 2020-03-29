import Notification from '../schemas/Notification';
import Deliveryman from '../models/Deliveryman';

class NotificationController {
    async index(req, res) {
        // const isDeliveryman = await Deliveryman.findOne({
        //     where: {
        //         id: req.userId,
        //     },
        // });

        // if (!isProvider) {
        //     return res.status(401).json({
        //         error: 'Only deliverymans can load notifications',
        //     });
        // }

        // const notifications = await Notification.find({
        //     user: req.userId,
        // })
        //     .sort('-createdAt')
        //     .limit(20);
        // return res.json(notifications);
    }

    async update(req, res) {
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            {
                read: true,
            },
            { new: true }
        );
        return res.json(notification);
    }
}

export default new NotificationController();
