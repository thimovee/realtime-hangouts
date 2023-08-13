"use client"
import { FC, useState } from "react";
import { Button } from "./ui/Button";
import { addUserToRoom } from "@/app/_actions/user";
import { useRouter } from "next/navigation";
import { Users2 } from "lucide-react";

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
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <Button size="sm" className="bg-primary hover:bg-primary/80 text-white px-6 ml-auto mr-4" disabled={loading} isLoading={loading} onClick={joinGroup}>
            {!loading && <Users2 className='w-4 h-4 mr-3' />}
            Join
        </Button >
    );
}

export default JoinGroup;