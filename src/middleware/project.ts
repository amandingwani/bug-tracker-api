import { NextFunction, Request, Response } from 'express';
import prisma from '../db';

import { ProjectUpdateSchema, ProjectDeleteSchema } from '../utils/formValidator';

export const sanitizeAndOwnerCheck = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (req.method === 'UPDATE') res.locals.parsedData = ProjectUpdateSchema.parse(req.body);
		else if (req.method === 'DELETE') res.locals.parsedData = ProjectDeleteSchema.parse(req.body);

		const existingProject = await prisma.project.findUnique({
			where: {
				id: res.locals.parsedData.id,
			},
			select: {
				ownerId: true,
			},
		});

		if (existingProject && existingProject.ownerId === res.locals.userData.id) {
			next();
		} else {
			res.status(405).json({ error: 'Not allowed' });
		}
	} catch (error) {
		res.status(500).json({ error: error });
	}
};
