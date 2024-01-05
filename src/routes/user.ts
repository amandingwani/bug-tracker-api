import express from 'express';
import { profile } from '../controllers/profile';
import { addUserByEmail } from '../controllers/user';
import { authChecker, addUser as addUserMiddleware } from '../middleware';

const router = express.Router();

// get the logged in user's profile
router.get('/profile', authChecker, profile);

// handle adding unregistered google user by email
router.post('/addByEmail', authChecker, addUserMiddleware, addUserByEmail);

export default router;
