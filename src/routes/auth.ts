import express from 'express';
import { googleAuth } from '../controllers/googleAuth';
import { logout } from '../controllers/logout';
import { authChecker } from '../middleware';

const router = express.Router();

// handle google login
router.post('/google', googleAuth);
// handle logout
router.post('/logout', authChecker, logout);

export default router;
