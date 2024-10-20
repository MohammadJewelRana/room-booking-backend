import { Router } from 'express';
import { RoomControllers } from './rooms.controller';

const router = Router();

router.post('/create-room', RoomControllers.createRoom);
router.get('/', RoomControllers.getAllRoom);
router.get('/:id', RoomControllers.getSingleRoom);
router.delete('/:id', RoomControllers.deleteSingleRoom);
router.patch('/:id', RoomControllers.updateSingleRoom);

export const RoomRoutes = router;
