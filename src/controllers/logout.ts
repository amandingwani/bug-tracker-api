import { Request, Response } from 'express';
import { AUTH_COOKIE_DOMAIN } from '../config/env';

export const logout = (req: Request, res: Response) => {
  res.cookie('token', '', { domain: AUTH_COOKIE_DOMAIN, sameSite: 'none', secure: true }).status(200).json('logout ok');
};
