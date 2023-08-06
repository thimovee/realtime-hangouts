import { z } from "zod"
export const messageSchema = z.object({
    content: z.string().min(3, { message: "Message must be atleast 3 characters" }).max(255, { message: "Message must be less than 255 characters" })
})