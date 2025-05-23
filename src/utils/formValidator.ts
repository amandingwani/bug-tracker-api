import { z } from 'zod';

/**
 * Zod schema
 */
export const ProjectCreateInput = z.object({
  name: z.string(),
  description: z.string(),
  status: z.union([
    z.literal('OPEN'),
    z.literal('IN_PROGRESS'),
    z.literal('ON_HOLD'),
    z.literal('COMPLETED'),
    z.literal('CANCELED'),
    z.literal('TESTING'),
    z.literal('DEPLOYED'),
  ]),
});

export const EmailSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.'),
});

export const ProjectUpdateSchema = ProjectCreateInput.partial().extend({
  id: z.number(),
});

// {id: projectId, email: emailOfContributor}
export const ProjectAddContributorSchema = EmailSchema.extend({
  id: z.number(),
});

export const ticketTypeSchema = z.union([z.literal('BUG'), z.literal('TASK')]);

export const ticketPrioritySchema = z.union([
  z.literal('URGENT'),
  z.literal('HIGH'),
  z.literal('NORMAL'),
  z.literal('LOW'),
]);

export const ticketStatusSchema = z.union([
  z.literal('OPEN'),
  z.literal('IN_PROGRESS'),
  z.literal('TO_BE_TESTED'),
  z.literal('CLOSED'),
]);

export const TicketCreateInputSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  type: ticketTypeSchema,
  priority: ticketPrioritySchema,
  status: ticketStatusSchema,
  projectId: z.number(),
  assigneeId: z.number().nullable(),
});

export const TicketUpdateSchema = TicketCreateInputSchema.extend({
  id: z.number(),
});

export const TicketDeleteSchema = z.object({
  id: z.number(),
});

export const ProjectDeleteSchema = z.object({
  id: z.number(),
});
