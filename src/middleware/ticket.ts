import { NextFunction, Request, Response } from 'express';
import prisma from '../db';

import {
  TicketCreateInputSchema,
  TicketUpdateSchema,
  TicketDeleteSchema,
} from '../utils/formValidator';

export const deleteTicketMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.locals.parsedData = TicketDeleteSchema.parse(req.body);

    const existingTicket = await prisma.ticket.findUnique({
      where: {
        id: res.locals.parsedData.id,
      },
      select: {
        authorId: true,
        project: {
          select: {
            ownerId: true,
          },
        },
      },
    });

    if (existingTicket) {
      // user can be author or project owner to delete
      if (
        existingTicket.authorId === res.locals.userData.id ||
        existingTicket.project.ownerId === res.locals.userData.id
      ) {
        next();
      } else {
        res.status(405).json({ error: 'Not allowed' });
      }
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateTicketMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.locals.parsedData = TicketUpdateSchema.parse(req.body);

    const existingTicket = await prisma.ticket.findUnique({
      where: {
        id: res.locals.parsedData.id,
      },
      select: {
        authorId: true,
        assigneeId: true,
        project: {
          select: {
            ownerId: true,
          },
        },
      },
    });

    if (existingTicket) {
      // user can be author or assignee or project owner to edit
      if (
        existingTicket.authorId === res.locals.userData.id ||
        existingTicket.assigneeId === res.locals.userData.id ||
        existingTicket.project.ownerId === res.locals.userData.id
      ) {
        next();
      } else {
        res.status(405).json({ error: 'Not allowed' });
      }
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
