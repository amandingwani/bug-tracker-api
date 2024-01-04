import express from 'express';
import { profile } from '../controllers/profile';
import { authChecker } from '../middleware';

const router = express.Router();

router.get('/profile', authChecker, profile);

export default router;
