import { Request, Response } from 'express';

export const profile = (req: Request, res: Response) => {
  res.json(res.locals.userData);
};
