import { Router } from 'express';
import multer from 'multer';
// import UserController from './app/controllers/UserController';
import FileController from './app/controllers/FileController';

import SessionController from './app/controllers/SessionController';

import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import ScheduleController from './app/controllers/ScheduleController';
import CompletedDeliveryController from './app/controllers/CompletedDeliveryController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';

// import NotificationController from './app/controllers/NotificationController';

import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

const upload = multer(multerConfig);

const routes = new Router();

// routes.post('/users', UserController.store);

// DELIVERYMAN ACTIONS
routes.get('/deliveryman/:deliverymanId/deliveries', ScheduleController.index);
routes.put('/delivery/:deliveryId/start-delivery', ScheduleController.update);

routes.get(
    '/deliveryman/:deliverymanId/completed-deliveries',
    CompletedDeliveryController.index
);
routes.post(
    '/delivery/:deliveryId/complete-delivery',
    CompletedDeliveryController.store
);

routes.post('/delivery/:deliveryId/problems', DeliveryProblemController.store);
routes.get('/delivery/:deliveryId/problems', DeliveryProblemController.index);

// FILES
routes.post('/files', upload.single('file'), FileController.store);

// AUTH
routes.post('/session', SessionController.store);
routes.use(authMiddleware);

// RECIPIENTS
routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:recipientId', RecipientController.update);
routes.delete('/recipients/:recipientId', RecipientController.delete);

// DELIVERYMANS
routes.get('/deliverymans', DeliverymanController.index);
routes.post('/deliverymans', DeliverymanController.store);
routes.put('/deliverymans/:deliverymanId', DeliverymanController.update);
routes.delete('/deliverymans/:deliverymanId', DeliverymanController.delete);

// DELIVERIES
routes.get('/deliveries', DeliveryController.index);
routes.post('/deliveries', DeliveryController.store);
routes.put('/deliveries/:deliveryId', DeliveryController.update);
routes.delete('/deliveries/:deliveryId', DeliveryController.delete);

// PROBLEMS
routes.delete(
    '/problem/:problemId/cancel-delivery',
    DeliveryProblemController.delete
);

// FILES
routes.post('/files', upload.single('file'), FileController.store);

// NOTIFICATIONS
// routes.get('/notifications', NotificationController.index);
// routes.put('/notifications/:id', NotificationController.update);

export default routes;
