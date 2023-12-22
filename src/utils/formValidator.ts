import { z } from 'zod'

/**
 * Zod schema
 */
export const ProjectCreateInput = z.object({
    name: z.string(),
    description: z.string(),
    status: z.union([
        z.literal("OPEN"),
        z.literal("IN_PROGRESS"),
        z.literal("ON_HOLD"),
        z.literal("COMPLETED"),
        z.literal("CANCELED"),
        z.literal("TESTING"),
        z.literal("DEPLOYED")
    ])
})