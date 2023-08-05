"use server"
import { db } from "@/lib/db";

export async function addUser(roomId: number, userId: string) {
    await db.room.update({
        where: {
            id: roomId
        },
        data: {
            users: {
                connect: {
                    id: userId
                }
            }
        }
    })
}