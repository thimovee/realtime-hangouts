"use server"
import { db } from "@/lib/db";
import { roomSchema } from "@/lib/validations/room";
import { z } from "zod";

export async function addUserToRoom(roomId: number, userId: string) {
    const room = await db.room.findUnique({
        where: { id: roomId },
        include: { users: true }
    });

    if (!room) {
        throw new Error("Room not found");
    }

    if (room.users.length === room.capacity) {
        throw new Error("Room is full");
    }

    const userExistsInRoom = room.users.some(user => user.id === userId);

    if (userExistsInRoom) {
        throw new Error("User is already in the room");
    }

    await db.room.update({
        where: { id: roomId },
        data: { users: { connect: { id: userId } } }
    });
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
        },
    })
}

export async function getRoomUsers(roomId: number) {
    const users = await db.room.findUnique({
        where: {
            id: roomId
        },
        include: {
            users: true
        }
    })
    return users;
}

export async function getRoomData(roomId: number) {
    const room = await db.room.findUnique({
        where: {
            id: roomId
        },
        include: {
            messages: {
                include: {
                    user: true
                }
            },
            category: true,
            users: true
        }
    })
    return room
}

export async function addRoom(input: z.infer<typeof roomSchema>) {
    const { ...otherData } = input;
    const roomData = { ...otherData, };
    await db.room.create({
        data: roomData,
    })
}
