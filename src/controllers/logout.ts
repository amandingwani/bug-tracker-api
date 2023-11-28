import { Request, Response } from 'express';

export const logout = (req: Request, res: Response) => {
    res.cookie('token', '', { sameSite: 'none', secure: true }).status(200).json('logout ok');
};
