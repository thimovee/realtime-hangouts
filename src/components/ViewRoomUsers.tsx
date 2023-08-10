"use client"
import { FC, useState } from "react";
import { Button } from "./ui/Button";
import { useRouter } from "next/navigation";
import { getRoomUsers } from "@/app/_actions/room";
import { Cross, User2, X } from "lucide-react";
import { Room, User } from "@prisma/client";
import Image from "next/image";
import { UserAvatar } from "./UserAvatar";
import { ScrollArea } from "./ui/scroll-area";
interface ViewUsersInRoomProps {
    roomId: number;
}

const ViewUsersInRoom: FC<ViewUsersInRoomProps> = ({ roomId }) => {
    const [isShown, setIsShown] = useState(false)
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState<Room & { users: User[] } | null>(null)
    const handleSubmit = async () => {
        setLoading(true)
        try {
            const UsersInRoom = await getRoomUsers(roomId)
            setUsers(UsersInRoom)
            setIsShown(true)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)

        }
    }


    return (
        <>
            <Button size="sm" variant="ghost" className="px-2 md:px-6" disabled={loading} isLoading={loading} onClick={handleSubmit}>
                {!loading && <User2 className="w-4 h-4 mr-0 md:mr-2" />}
                <span className="sr-only">Room Members</span>
                <span className="hidden md:inline">Room Members</span>
            </Button >
            {isShown && (
                <div className="flex flex-col max-w-xs mx-auto z-50 fixed left-0 right-0 mt-96 bg-card border border-border rounded-md p-4">
                    <button onClick={() => setIsShown(false)} className="ml-auto mb-4">
                        <X className="w-5 h-5" />
                    </button>
                    <ScrollArea className="h-[250px]">
                        {users?.users.map((user) => {
                            return (
                                <span key={user.id} className="flex items-center ml-4 my-4 border-b border-neutral-700 py-2">
                                    <UserAvatar user={{ name: user.name || null, image: user.image || null }}
                                        className='h-8 w-8' />
                                    <h3 className="ml-4 text-slate-300"> {user.name}</h3>
                                </span>
                            )
                        })}
                    </ScrollArea>
                </div>
            )}
            {isShown && <div
                className="fixed inset-0 z-40 bg-black/80"
            />}
        </>
    );
}

export default ViewUsersInRoom;