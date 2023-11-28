import express from 'express';
import { googleAuth } from '../controllers/googleAuth';
import { logout } from '../controllers/logout';
import middleware from '../middleware';

const router = express.Router();

router.post('/google', googleAuth);
router.post('/logout', middleware.authChecker, logout);

export default router;
