import express from 'express';
import { googleAuth } from '../controllers/googleAuth';
import { logout } from '../controllers/logout';
import { authChecker } from '../middleware';

const router = express.Router();

router.post('/google', googleAuth);
router.post('/logout', authChecker, logout);

export default router;
