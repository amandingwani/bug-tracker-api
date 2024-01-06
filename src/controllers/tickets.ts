import { Request, Response } from 'express';
import prisma from '../db';
import {
  TicketCreateInputSchema,
  TicketUpdateSchema,
  TicketDeleteSchema,
} from '../utils/formValidator';
import { contributorSelector } from './projects';

// // get a ticket
// export const getTicket = async (req: Request, res: Response) => {
//   try {
//     let ticket = await prisma.ticket.findUnique({
//       where: {
//         id: parseInt(req.params.ticketId),
//       },
//       include: {
//         comments: true,
//       },
//     });
//     res.json(ticket);
//   } catch (error) {
//     res.json({ error: error });
//     console.log(error);
//   }
// };

// // get all the tickets associated with a user (author or an assignee to a ticket)
// export const getTicketsForUser = async (req: Request, res: Response) => {
//   try {
//     let allTicketsForUser = await prisma.user.findUnique({
//       where: {
//         id: res.locals.userData.id,
//       },
//       select: {
//         createdTickets: {
//           include: {
//             author: {
//               select: {
//                 firstName: true,
//                 lastName: true,
//               },
//             },
//             assignee: {
//               select: {
//                 firstName: true,
//                 lastName: true,
//               },
//             },
//             project: {
//               select: {
//                 name: true,
//               },
//             },
//           },
//         },
//         assignedTickets: {
//           include: {
//             author: {
//               select: {
//                 firstName: true,
//                 lastName: true,
//               },
//             },
//             assignee: {
//               select: {
//                 firstName: true,
//                 lastName: true,
//               },
//             },
//             project: {
//               select: {
//                 name: true,
//               },
//             },
//           },
//         },
//       },
//     });
//     res.json(allTicketsForUser);
//   } catch (error) {
//     res.json({ error: error });
//     console.log(error);
//   }
// };

// // get all the tickets associated with a project
// export const getTicketsForProject = async (req: Request, res: Response) => {
//   try {
//     let allTicketsForProject = await prisma.project.findUnique({
//       where: {
//         id: parseInt(req.params.projectId),
//       },
//       select: {
//         tickets: true,
//       },
//     });
//     res.json(allTicketsForProject);
//   } catch (error) {
//     res.json({ error: error });
//     console.log(error);
//   }
// };

export const ticketFieldsSelector = {
  id: true,
  title: true,
  description: true,
  type: true,
  status: true,
  priority: true,
  createdAt: true,
  author: {
    select: contributorSelector,
  },
  assignee: {
    select: contributorSelector,
  },
  project: {
    select: {
      id: true,
      name: true,
      contributors: true,
    },
  },
}

// create a new ticket
export const createTicket = async (req: Request, res: Response) => {
  try {
    const parsedData = TicketCreateInputSchema.parse(req.body);

    const ticket = await prisma.ticket.create({
      data: {
        title: parsedData.title,
        description: parsedData.description,
        authorId: res.locals.userData.id,
        type: parsedData.type,
        priority: parsedData.priority,
        status: parsedData.status,
        projectId: parsedData.projectId,
        assigneeId: parsedData.assigneeId
      },
      select: ticketFieldsSelector
    });
    res.json(ticket);
  } catch (error: unknown) {
    res.json({ error: error });
  }
};

// update a ticket
export const updateTicket = async (req: Request, res: Response) => {
  try {
    const parsedData = res.locals.parsedData;

    const ticket = await prisma.ticket.update({
      where: {
        id: parsedData.id,
      },
      data: {
        title: parsedData.title,
        description: parsedData.description,
        type: parsedData.type,
        priority: parsedData.priority,
        status: parsedData.status,
        projectId: parsedData.projectId,
        assigneeId: parsedData.assigneeId
      },
      select: ticketFieldsSelector
    });
    res.json(ticket);
  } catch (error: unknown) {
    res.json({ error: error });
  }
};

// delete a ticket
export const deleteTicket = async (req: Request, res: Response) => {
  try {
    const deleteTicket = await prisma.ticket.delete({
      where: {
        id: res.locals.parsedData.id,
      },
      select: ticketFieldsSelector
    });

    res.json(deleteTicket);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
