import { UserAvatar } from "@/components/UserAvatar";
import { Button } from "@/components/ui/Button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { FunctionComponent } from "react";

interface PageProps {
    params: {
        id: String;
    }
}

const Page: FunctionComponent<PageProps> = async ({ params }) => {
    const session = await getServerSession(authOptions)
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
            user: message.user.name,
            userId: message.user.id,
            avatarUrl: message.user.image
        }
    })


    const displayedUserCount = 4
    const usersAboveFour = room && room.users.length - displayedUserCount

    async function sendMessage() {
        "use server"
    }

    return (
        <section className="">
            <div className="bg-neutral-800 fixed w-full py-4 -mt-[70px]">
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
                        {usersAboveFour > 0 && <div className="h-8 w-8 bg-neutral-600 rounded-full ring ring-neutral-700 -ml-3 z-50 flex items-center font-semibold text-lg justify-center">+{usersAboveFour}</div>}
                    </div>
                    <Button variant="cta" size="sm">Leave Group</Button>
                </div>
            </div>
            <div className="flex max-w-7xl mx-auto p-4 items-end">
                <ScrollArea className="scroll-smooth border border-neutral-800 rounded-md flex flex-col w-full h-[65vh] mt-8">
                    {roomMessages && roomMessages.map((message) => {
                        return (
                            <div className={cn(
                                "w-full flex",
                                message.userId === session?.user.id ? "justify-end" : "justify-start"
                            )} key={message.id}>
                                <div className="flex gap-4">
                                    <UserAvatar user={{ image: message.avatarUrl, name: message.user }} key={message.userId} />
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2">
                                            <h1 className="font-semibold">{message.user}</h1>
                                        </div>
                                        <p className="text-sm text-neutral-300">{message.content}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </ScrollArea>
            </div>

            <div className="flex flex-col gap-4 max-w-7xl mx-auto px-4 py-4 sticky bottom-0">
                <div className="flex gap-4">
                    <div className="flex-1">
                        <input type="text" className="w-full bg-neutral-700 rounded-lg px-4 py-2" placeholder="Message #general" />
                    </div>
                    <form action={sendMessage}>
                        <input placeholder="Send a message" className="" />
                        <Button variant="cta" size="sm">Send</Button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Page;