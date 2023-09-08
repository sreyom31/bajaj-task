import { Router } from 'express';
import userController from '../controllers/user.controller';

const router = Router();

router
  .route('/bfhl')
  .post(userController.calculateAlphabet)
  .get(userController.getStatus);

export default router;
