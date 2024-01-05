import { Request, Response } from 'express';
import prisma from '../db';
import { ProjectCreateInput, ProjectUpdateSchema } from '../utils/formValidator';

// get all the projects (along with its tickets) associated with a user (owner or a contributor to a project)
export const getProjects = async (req: Request, res: Response) => {
  try {
    let allProjects = await prisma.user.findUnique({
      where: {
        id: res.locals.userData.id,
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
                lastName: true,
              },
            },
            ownerId: true,
            status: true,
            contributors: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
                registered: true
              }
            },
            tickets: {
              select: {
                id: true,
                title: true,
                description: true,
                authorId: true,
                author: {
                  select: {
                    firstName: true,
                    lastName: true,
                  },
                },
                asigneeId: true,
                asignee: {
                  select: {
                    firstName: true,
                    lastName: true,
                  },
                },
                type: true,
                priority: true,
                status: true,
                createdAt: true,
                projectId: true,
                project: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            createdAt: true,
          },
        },
        otherProjects: {
          select: {
            id: true,
            name: true,
            description: true,
            owner: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
            ownerId: true,
            status: true,
            tickets: {
              select: {
                id: true,
                title: true,
                description: true,
                authorId: true,
                author: {
                  select: {
                    firstName: true,
                    lastName: true,
                  },
                },
                asigneeId: true,
                asignee: {
                  select: {
                    firstName: true,
                    lastName: true,
                  },
                },
                type: true,
                priority: true,
                status: true,
                createdAt: true,
                projectId: true,
                project: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            createdAt: true,
          },
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
      include: {
        owner: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        tickets: true,
      },
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
          select: {
            firstName: true,
            lastName: true,
            email: true,
            registered: true
          }
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
          select: {
            firstName: true,
            lastName: true,
            email: true,
            registered: true
          }
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
// console.log('deleting...');
// res.json({
// 	error: {
// 		message: 'test'
// 	}
// })
