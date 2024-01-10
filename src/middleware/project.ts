import { NextFunction, Request, Response } from 'express';
import prisma from '../db';

import { ProjectUpdateSchema, ProjectDeleteSchema, ProjectAddContributorSchema, ProjectCreateInput } from '../utils/formValidator';

export const sanitizeAndOwnerCheck = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (req.method === 'PUT') {
			if (req.url === '/addContributor') {
				res.locals.parsedData = ProjectAddContributorSchema.parse(req.body);
			}
			else {
				res.locals.parsedData = ProjectUpdateSchema.parse(req.body);
			}
		}
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

export const removeContributorMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	try {
		res.locals.parsedData = ProjectAddContributorSchema.parse(req.body);

		const existingProject = await prisma.project.findUnique({
			where: {
				id: res.locals.parsedData.id,
			},
			select: {
				ownerId: true,
				contributors: true
			},
		});

		if (existingProject
			// case1: owner of project is trying to remove a contributor
			&& (existingProject.ownerId === res.locals.userData.id
				// case2: contributor of project is trying to leave the project
				|| existingProject.contributors.find(c => (c.id === res.locals.userData.id && c.email === res.locals.parsedData.email)))) {
			next();
		} else {
			res.status(405).json({ error: 'Not allowed' });
		}
	} catch (error) {
		res.status(500).json({ error: error });
	}
};