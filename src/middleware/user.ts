import { NextFunction, Request, Response } from 'express';
import prisma from '../db';

import { EmailSchema } from '../utils/formValidator';

/**
 * Sanitizes the input
 * Also checks for already existing user
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export const addUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.locals.parsedData = EmailSchema.parse(req.body);

        const existingUser = await prisma.user.findUnique({
            where: {
                email: res.locals.parsedData.email,
            }
        });

        if (!existingUser) {
            next();
        } else {
            res.status(406).json({ error: 'User already registered' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
