import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config/env';

export const logout = (req: Request, res: Response) => {
    const token = req.cookies?.token;
    try {
        if (token) {
            jwt.verify(token, JWT_SECRET, {}, (err) => {
                if (err) throw err;
                res.cookie('token', '', { sameSite: 'none', secure: true }).status(200).json('logout ok');
            });
        }
        else {
            res.status(401).json('no token');
        }
    } catch (error) {
        res.status(401).json('Unauthorized');
    }
};
