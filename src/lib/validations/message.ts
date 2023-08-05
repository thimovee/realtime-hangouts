import { z } from "zod"

export const messageSchema = z.object({
    content: z.string(),
    userId: z.number(),
    roomId: z.number(),
})