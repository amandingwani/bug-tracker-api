import { Request, Response } from 'express';
import prisma from '../db';
import { ProjectCreateInput, ProjectUpdateSchema } from '../utils/formValidator';
import { ticketFieldsSelector } from './tickets';

export const contributorSelector = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  registered: true
}

const projectFieldSelector = {
  id: true,
  name: true,
  description: true,
  owner: {
    select: contributorSelector,
  },
  status: true,
  contributors: {
    select: contributorSelector
  },
  tickets: {
    select: ticketFieldsSelector
  },
  createdAt: true,
}

// get all the projects (along with its tickets) associated with a user (owner or a contributor to a project)
export const getProjects = async (req: Request, res: Response) => {
  try {
    let allProjects = await prisma.user.findUnique({
      where: {
        id: res.locals.userData.id,
      },
      select: {
        createdProjects: {
          select: projectFieldSelector
        },
        otherProjects: {
          select: projectFieldSelector
        },
      },
    });
    res.json(allProjects);
  } catch (error) {
    res.json({ error: error });
    console.log(error);
  }
};

// create a new project
export const createProject = async (req: Request, res: Response) => {
  try {
    // form sanitizer
    const parsedData = ProjectCreateInput.parse(req.body);

    const project = await prisma.project.create({
      data: {
        name: parsedData.name,
        description: parsedData.description,
        status: parsedData.status,
        ownerId: res.locals.userData.id,
      },
      select: projectFieldSelector
    });
    res.json(project);
  } catch (error: unknown) {
    res.json({ error: error });
  }
};

// update a project
export const updateProject = async (req: Request, res: Response) => {
  try {
    const project = await prisma.project.update({
      where: {
        id: res.locals.parsedData.id,
      },
      data: {
        name: res.locals.parsedData.name,
        description: res.locals.parsedData.description,
        status: res.locals.parsedData.status,
      },
    });
    res.json(project);
  } catch (error: unknown) {
    res.json({ error: error });
  }
};

export const addContributor = async (req: Request, res: Response) => {
  try {
    // first check is user already exists, else create the user
    const existingUser = await prisma.user.findUnique({
      where: {
        email: res.locals.parsedData.email,
      }
    });

    if (!existingUser) {
      const user = await prisma.user.create({
        data: {
          registered: false,
          email: res.locals.parsedData.email,
          firstName: res.locals.parsedData.email.split('@')[0],
        },
      });
    }

    const project = await prisma.project.update({
      where: {
        id: res.locals.parsedData.id,
      },
      data: {
        contributors: {
          connect: { email: res.locals.parsedData.email }
        }
      },
      include: {
        contributors: {
          select: contributorSelector
        },
      }
    });
    res.json(project);
  } catch (error: unknown) {
    res.json({ error: error });
  }
};

export const removeContributor = async (req: Request, res: Response) => {
  try {
    const project = await prisma.project.update({
      where: {
        id: res.locals.parsedData.id,
      },
      data: {
        contributors: {
          disconnect: { email: res.locals.parsedData.email }
        }
      },
      include: {
        contributors: {
          select: contributorSelector
        },
      }
    });
    res.json(project);
  } catch (error: unknown) {
    res.json({ error: error });
  }
};

// delete a project
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const deleteProject = await prisma.project.delete({
      where: {
        id: res.locals.parsedData.id,
      },
    });

    res.json(deleteProject);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
