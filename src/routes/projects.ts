import express from 'express';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  addContributor,
  removeContributor,
} from '../controllers/projects';
import { authChecker, sanitizeAndOwnerCheck, removeContributorMiddleware } from '../middleware';
import { infoLog } from '../middleware';

const router = express.Router();

// get all the projects associated with a user (owner or a contributor to a project)
router.get('/', infoLog, authChecker, getProjects);

// create a new project
router.post('/', authChecker, createProject);

// update a project
router.put('/', authChecker, sanitizeAndOwnerCheck, updateProject);

// delete a project
router.delete('/', authChecker, sanitizeAndOwnerCheck, deleteProject);

// add a contributor to a project
router.put('/addContributor', authChecker, sanitizeAndOwnerCheck, addContributor);

// remove a contributor from a project
router.put('/removeContributor', authChecker, removeContributorMiddleware, removeContributor);

export default router;
