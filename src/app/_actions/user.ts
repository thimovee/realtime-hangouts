"use server"
import { db } from "@/lib/db";

export async function addUserToRoom(roomId: number, userId: string) {
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

export async function removeUserFromRoom(roomId: number, userId: string) {
    await db.room.update({
        where: {
            id: roomId
        },
        data: {
            users: {
                disconnect: {
                    id: userId
                }
            }
        }
    })
}