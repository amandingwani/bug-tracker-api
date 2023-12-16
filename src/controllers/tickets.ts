import { Request, Response } from 'express';
import prisma from '../db';
import { User, Project, Ticket } from '@prisma/client';

// get a ticket
export const getTicket = async (req: Request, res: Response) => {
	try {
		let ticket = await prisma.ticket.findUnique({
			where: {
				id: parseInt(req.params.ticketId)
			},
			include: {
				comments: true
			}
		})
		res.json(ticket)
	} catch (error) {
		res.json({ error: error });
		console.log(error);
	}
}

// get all the tickets associated with a user (author or an asignee to a ticket)
export const getTicketsForUser = async (req: Request, res: Response) => {
	try {
		let allTicketsForUser = await prisma.user.findUnique({
			where: {
				id: res.locals.userData.id
			},
			select: {
				createdTickets: {
					include: {
						author: {
							select: {
								firstName: true,
								lastName: true
							}
						},
						asignee: {
							select: {
								firstName: true,
								lastName: true
							}
						},
						project: {
							select: {
								name: true,
							}
						}
					}
				},
				assignedTickets: {
					include: {
						author: {
							select: {
								firstName: true,
								lastName: true
							}
						},
						asignee: {
							select: {
								firstName: true,
								lastName: true
							}
						},
						project: {
							select: {
								name: true,
							}
						}
					}
				}
			}
		});
		res.json(allTicketsForUser);

	} catch (error) {
		res.json({ error: error });
		console.log(error);
	}
}

// get all the tickets associated with a project
export const getTicketsForProject = async (req: Request, res: Response) => {
	try {
		let allTicketsForProject = await prisma.project.findUnique({
			where: {
				id: parseInt(req.params.projectId)
			},
			select: {
				tickets: true
			}
		});
		res.json(allTicketsForProject);

	} catch (error) {
		res.json({ error: error });
		console.log(error);
	}
}

// // create a new project
// export const createProject = async (req: Request, res: Response) => {
// 	try {
// 		// form sanitizer
// 		let allProjects = await prisma.user.findUnique({
// 			where: {
// 				id: res.locals.userData.id
// 			},
// 			select: {
// 				createdProjects: true,
// 				otherProjects: true
// 			}
// 		});
// 		res.json(allProjects);

// 	} catch (error) {
// 		res.json({ error: error });
// 		console.log(error);
// 	}
// }
