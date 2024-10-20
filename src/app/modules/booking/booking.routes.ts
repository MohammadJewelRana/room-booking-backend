import { Router } from 'express';
import { BookingControllers } from './booking.controller';
 

const router = Router();

router.post('/create-booking', BookingControllers.createBooking);
router.get('/', BookingControllers.getAllBooking);
router.get('/:id', BookingControllers.getSingleBooking);
router.delete('/:id', BookingControllers.deleteSingleBooking);
router.patch('/:id', BookingControllers.updateSingleBooking);

export const BookingRoutes = router;
