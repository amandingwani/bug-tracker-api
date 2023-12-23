import { Request, Response } from 'express';
import prisma from '../db';
import { TicketCreateInputSchema } from '../utils/formValidator';

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

// create a new ticket
export const createTicket = async (req: Request, res: Response) => {
	try {
		// form sanitizer
		const parsedData = TicketCreateInputSchema.parse(req.body);

		const ticket = await prisma.ticket.create({
			data: {
				title: parsedData.title,
				description: parsedData.description,
				authorId: res.locals.userData.id,
				type: parsedData.type,
				priority: parsedData.priority,
				status: parsedData.status,
				projectId: parsedData.projectId
			},
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
						name: true
					}
				}
			}
		});
		res.json(ticket);

	} catch (error: unknown) {
		res.json({ error: error });
	}
}