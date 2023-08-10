import { AddMessageForm } from "@/components/AddMessage";
import LeaveRoom from "@/components/LeaveRoom";
import Messages from "@/components/Messages";
import { ScrollArea } from "@/components/ui/scroll-area";
import { authOptions } from "@/lib/auth";
import { ExtentedMessage } from "@/types/message";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { FunctionComponent } from "react";
import ViewRoomUsers from "@/components/ViewRoomUsers";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getRoomData } from "@/app/_actions/room";

export const revalidate = 0;

interface PageProps {
    params: {
        id: String;
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const id = params.id
    // request deduped by next
    const room = await getRoomData(Number(id))
    return {
        title: room!.name,
        description: room!.description,
    }
}

const Page: FunctionComponent<PageProps> = async ({ params }) => {
    const session = await getServerSession(authOptions)
    const userId = session!.user.id
    const room = await getRoomData(Number(params.id))

    if (!room) {
        return notFound()
    }

    const roomMessages = room && room.messages.map((message) => {
        return {
            ...message,
            username: message.user.name,
            avatarUrl: message.user.image
        }
    }) as ExtentedMessage[]

    const isInRoom = room && room.users.some((user) => user.id === userId)

    return (
        <>
            {isInRoom ? <section>
                <div className="bg-accent w-full py-4 -mt-[70px] px-4 xl:px-0">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <div className="flex  gap-4">
                            <Image alt={room!.name} src={room!.category.imageUrl} width={50} height={50} className="max-w-[50px] max-h-[50px] object-cover rounded-full" />
                            <div>
                                <h1 className="text-xl font-bold text-foreground">{room && room.name}</h1>
                                <p className="text-sm text-primary font-medium">{room && room.category.name}</p>
                            </div>
                        </div>
                        <ViewRoomUsers roomId={room.id} />
                        <LeaveRoom roomId={room.id} userId={userId} />
                    </div>
                </div>
                <div className="flex max-w-7xl mx-auto p-4">
                    {roomMessages && (
                        <ScrollArea className="px-4 py-2 scroll-smooth border border-border rounded-md flex flex-col w-full h-[65vh] mt-8 z-0">
                            <div className="overflow-y-auto">
                                <Messages userId={userId} roomId={room.id} initialMessages={roomMessages} />
                            </div>
                        </ScrollArea>
                    )}
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