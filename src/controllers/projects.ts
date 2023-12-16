import { Request, Response } from 'express';
import prisma from '../db';
import { User, Project, Ticket } from '@prisma/client';

// get all the projects associated with a user (owner or a contributor to a project)
export const getProjects = async (req: Request, res: Response) => {
	try {
		let allProjects = await prisma.user.findUnique({
			where: {
				id: res.locals.userData.id
			},
			select: {
				createdProjects: {
					select: {
						id: true,
						name: true,
						description: true,
						owner: {
							select: {
								firstName: true,
								lastName: true
							}
						},
						status: true
					}
				},
				otherProjects: {
					select: {
						id: true,
						name: true,
						description: true,
						owner: {
							select: {
								firstName: true,
								lastName: true
							}
						},
						status: true
					}
				}
			}
		});
		res.json(allProjects);

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
