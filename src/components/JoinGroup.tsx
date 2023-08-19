"use client"
import { FC, useState } from "react";
import { Button } from "./ui/Button";
import { addUserToRoom } from "@/app/_actions/room";
import { useRouter } from "next/navigation";
import { Users2 } from "lucide-react";
import { toast } from "sonner";

interface JoinGroupProps {
    roomId: number;
    userId: string;
}

const JoinGroup: FC<JoinGroupProps> = ({ roomId, userId }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const joinGroup = async () => {
        setLoading(true)
        try {
            await addUserToRoom(roomId, userId)
            router.refresh()
            router.push(`/rooms/${roomId}`)
        } catch (error) {
            toast.error("Error joining room")
        } finally {
            setLoading(false)
        }
    }
    return (
        <Button size="sm" className="bg-white gap-3 text-black ring-2 ring-primary ring-offset-4 hover:ring-primary/80 ring-offset-neutral-900/60 px-6 ml-auto mr-4" disabled={loading} isLoading={loading} onClick={joinGroup}>
            {!loading && <Users2 className='w-5 h-5' />}
            Join
        </Button >
    );
}

export default JoinGroup;