import express from 'express';
import { getProjects, createProject, updateProject } from '../controllers/projects';
import { authChecker } from '../middleware';

const router = express.Router();

// get all the projects associated with a user (owner or a contributor to a project)
router.get('/', authChecker, getProjects);

// create a new project
router.post('/', authChecker, createProject);

router.put('/', authChecker, updateProject);

// router.delete('/:id', authChecker, deleteProject);

export default router;
