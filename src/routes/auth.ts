import express from 'express';
import { googleAuth } from '../controllers/googleAuth';
import { logout } from '../controllers/logout';

const router = express.Router();

router.post('/google', googleAuth);
router.post('/logout', logout);

export default router;
