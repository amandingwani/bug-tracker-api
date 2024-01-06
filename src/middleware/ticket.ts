import { NextFunction, Request, Response } from 'express';
import prisma from '../db';

import {
  TicketCreateInputSchema,
  TicketUpdateSchema,
  TicketDeleteSchema,
} from '../utils/formValidator';

export const sanitizeAndAuthorCheck = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.method === 'PUT') res.locals.parsedData = TicketUpdateSchema.parse(req.body);
    else if (req.method === 'DELETE') res.locals.parsedData = TicketDeleteSchema.parse(req.body);

    const existingTicket = await prisma.ticket.findUnique({
      where: {
        id: res.locals.parsedData.id,
      },
      select: {
        authorId: true,
      },
    });

    if (existingTicket && existingTicket.authorId === res.locals.userData.id) {
      next();
    } else {
      res.status(405).json({ error: 'Not allowed' });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
