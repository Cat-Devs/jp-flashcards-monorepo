import { Router } from 'express';
import { CardController, UserController } from '../controllers';
import { StatusController } from '../controllers/status.controller';

const router = Router();

router.get('/status', StatusController.getStatus);
router.get('/card/:cardId', CardController.getCard);
router.post('/user', UserController.getUser);
router.post('/auth', UserController.authUser);
router.post('/deck', CardController.createDeck);

export default router;
