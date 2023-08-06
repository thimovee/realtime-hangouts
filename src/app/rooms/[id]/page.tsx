import { AddMessageForm } from "@/components/AddMessage";
import JoinGroup from "@/components/JoinGroup";
import LeaveRoom from "@/components/LeaveRoom";
import Messages from "@/components/Messages";
import { UserAvatar } from "@/components/UserAvatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { ExtentedMessage } from "@/types/message";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { FunctionComponent } from "react";

export const revalidate = 0;

interface PageProps {
    params: {
        id: String;
    }
}

const Page: FunctionComponent<PageProps> = async ({ params }) => {
    const session = await getServerSession(authOptions)
    const userId = session!.user.id
    const room = await db.room.findUnique({
        where: {
            id: Number(params.id)
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

    if (!room) {
        return <div>Room not found</div>
    }

    const roomMessages = room && room.messages.map((message) => {
        return {
            ...message,
            username: message.user.name,
            avatarUrl: message.user.image
        }
    }) as ExtentedMessage[]


    const displayedUserCount = 3
    const usersAboveFour = room && room.users.length - displayedUserCount
    const isInRoom = room && room.users.some((user) => user.id === userId)
    return (
        <>
            {isInRoom ? <section>
                <div className="bg-neutral-800 fixed w-full py-4 -mt-[70px] px-4 xl:px-0">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <div className="flex  gap-4">
                            <Image alt={room!.name} src={room!.category.imageUrl} width={50} height={50} className="max-w-[50px] max-h-[50px] object-cover rounded-full" />
                            <div>
                                <h1 className="text-xl font-bold text-white">{room && room.name}</h1>
                                <p className="text-sm text-[#ffd12b]">{room && room.category.name}</p>
                            </div>
                        </div>
                        <div className="flex first:ml-0">
                            {room && room.users.slice(0, displayedUserCount).map((user) => {
                                return (
                                    <UserAvatar className="ring-neutral-700 ring -ml-3 h-8 w-8" user={user} key={user.id} />
                                )
                            })}
                            {usersAboveFour > 0 && <div className="h-8 w-8 bg-neutral-600 rounded-full ring ring-neutral-700 -ml-3 z-50 flex items-center font-semibold  justify-center text-sm">+{usersAboveFour}</div>}
                        </div>
                        <LeaveRoom roomId={room.id} userId={userId} />
                    </div>
                </div>
                <div className="flex max-w-7xl mx-auto p-4 items-end">
                    {roomMessages && <ScrollArea className="px-4 py-2 scroll-smooth border border-neutral-800  rounded-md flex flex-col w-full h-[65vh] mt-8">
                        <Messages userId={userId} roomId={room.id} initialMessages={roomMessages} />
                    </ScrollArea>}
                </div>
                <div className="flex max-w-7xl mx-auto p-4 items-end">
                    {isInRoom && <AddMessageForm roomId={room.id} userrId={userId} />}
                </div>
            </section> : <section className="flex mt-32  flex-col gap-10 max-w-7xl items-center mx-auto p-4">
                <h2 className="text-2xl font-bold">Join this room to send and view messages.</h2>
                <a href="/rooms">Back to <span className="underline underline-offset-4 font-semibold text-sky-500">rooms.</span></a>
            </section>}
        </>
    );
}

export default Page;