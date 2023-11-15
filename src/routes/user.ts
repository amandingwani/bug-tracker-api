import express from 'express';
import { profile } from '../controllers/profile';

const router = express.Router();

router.get('/profile', profile);

export default router;
