"use server"
import { db } from "@/lib/db";

export async function addMessage(roomId: number, userId: string, content: string) {
    await db.message.create({
        data: {
            content: content,
            room: {
                connect: {
                    id: roomId
                }
            },
            user: {
                connect: {
                    id: userId
                }
            }
        }
    })
}