import { Router } from 'express';
import { validateLogin, validateRegister } from '../../middlewares/validationMiddleware';
import { login, register, verifyEmail } from '../../auth/controllers/authController';

const router = Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/verify-email/:token', verifyEmail);

export default router;
