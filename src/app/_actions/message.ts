"use server"
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

export async function addMessage(roomId: number, userId: string, content: string) {
    const newMessage = await db.message.create({
        data: {
            content: content,
            userId: userId,
            roomId: roomId
        },
        include: {
            user: true
        }
    })

    const updatedRoom = await db.room.update({
        where: {
            id: roomId
        },
        data: {
            messages: {
                connect: {
                    id: newMessage.id,
                },
            },
        },
        include: {
            users: true,
            messages: true
        }
    })
    await pusherServer.trigger(roomId.toString(), 'messages:new', newMessage);

    const lastMessage = updatedRoom.messages[updatedRoom.messages.length - 1];

    updatedRoom.users.map((user) => {
        pusherServer.trigger(user.email!, 'message:update', {
            id: user.id,
            messages: [lastMessage]
        });
    });
    await pusherServer.trigger(roomId.toString(), 'messages:new', newMessage)
}
