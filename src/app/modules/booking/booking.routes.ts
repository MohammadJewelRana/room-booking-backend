import { Router } from 'express';
import { BookingControllers } from './booking.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post('/create-booking',auth(USER_ROLE.user), BookingControllers.createBooking);
router.get('/',auth(USER_ROLE.admin,USER_ROLE.user), BookingControllers.getAllBooking);
router.get('/:id',auth(USER_ROLE.admin,USER_ROLE.user), BookingControllers.getSingleBooking);
router.delete('/:id',auth(USER_ROLE.admin,USER_ROLE.user), BookingControllers.deleteSingleBooking);
router.patch('/:id',auth(USER_ROLE.admin,USER_ROLE.user), BookingControllers.updateSingleBooking);

export const BookingRoutes = router;
