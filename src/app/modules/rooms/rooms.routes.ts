import { Router } from 'express';
import { RoomControllers } from './rooms.controller';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middleware/auth';

const router = Router();

router.post('/create-room',auth(USER_ROLE.admin), RoomControllers.createRoom);
router.get('/',auth(USER_ROLE.admin,USER_ROLE.user), RoomControllers.getAllRoom);
router.get('/:id',auth(USER_ROLE.admin,USER_ROLE.user), RoomControllers.getSingleRoom);
router.delete('/:id',auth(USER_ROLE.admin), RoomControllers.deleteSingleRoom);
router.patch('/:id',auth(USER_ROLE.admin), RoomControllers.updateSingleRoom);

export const RoomRoutes = router;
