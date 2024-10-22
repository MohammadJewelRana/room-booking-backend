import { Router } from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';

const router = Router();

router.post('/create-user',auth(USER_ROLE.admin,USER_ROLE.user), UserControllers.createUser);
router.get('/',auth(USER_ROLE.admin,USER_ROLE.user), UserControllers.getAllUser);
router.get('/:id', auth(USER_ROLE.admin,USER_ROLE.user),UserControllers.getSingleUser);
router.delete('/:id',auth(USER_ROLE.admin,USER_ROLE.user), UserControllers.deleteSingleUser);
router.patch('/:id', auth(USER_ROLE.admin,USER_ROLE.user),UserControllers.updateSingleUser);

router.post('/login', UserControllers.loginUser);

router.post('/refresh-token', UserControllers.refreshToken);

export const UserRoutes = router;
