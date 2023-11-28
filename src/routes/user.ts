import express from 'express';
import { profile } from '../controllers/profile';
import middleware from '../middleware';

const router = express.Router();

router.get('/profile', middleware.authChecker, profile);

export default router;
