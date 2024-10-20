import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { RoomRoutes } from '../modules/rooms/rooms.routes';
import { BookingRoutes } from '../modules/booking/booking.routes';

const router = Router();

const moduleRoutes = [
    { path: '/user', route: UserRoutes },
    { path: '/room', route: RoomRoutes },
    { path: '/booking', route: BookingRoutes },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
