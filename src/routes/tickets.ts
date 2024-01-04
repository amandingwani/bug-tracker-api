import express from 'express';
import {
  getTicket,
  getTicketsForUser,
  getTicketsForProject,
  createTicket,
  updateTicket,
  deleteTicket,
} from '../controllers/tickets';
import { authChecker, sanitizeAndAuthorCheck } from '../middleware';

const router = express.Router();

// get all the tickets associated with a user (owner or a contributor to a project)
router.get('/user', authChecker, getTicketsForUser);

// get all the tickets associated with a project
// !! Add middleware to check if user has access to that project
router.get('/project/:projectId', authChecker, getTicketsForProject);

// get a ticket
// !! Add middleware to check if user has access to that ticket
router.get('/:ticketId', authChecker, getTicket);

// create a new ticket
router.post('/', authChecker, createTicket);

router.put('/', authChecker, sanitizeAndAuthorCheck, updateTicket);

router.delete('/', authChecker, sanitizeAndAuthorCheck, deleteTicket);

export default router;
