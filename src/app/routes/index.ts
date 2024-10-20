import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { RoomRoutes } from '../modules/rooms/rooms.routes';

const router = Router();

const moduleRoutes = [
    { path: '/user', route: UserRoutes },
    { path: '/room', route: RoomRoutes },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
