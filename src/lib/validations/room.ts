import * as z from "zod"

export const roomSchema = z.object({
    name: z.string().min(3).max(255),
    description: z.string(),
    capacity: z.number().min(10, { message: "Room capacity must be atleast 10 or higher" }).max(100, { message: "Room capacity must be 100 or lower" }),
    categoryId: z.number(),
})

export const getRoomSchema = z.object({
    id: z.number(),
})