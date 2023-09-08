import { Router } from 'express';
import userRoute from './user.route';

const router = Router();

const defaultRoutes = [{ path: '/', route: userRoute }];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
