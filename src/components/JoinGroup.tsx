"use client"
import { FC, useState } from "react";
import { Button } from "./ui/Button";
import { addUserToRoom } from "@/app/_actions/user";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

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
        <Button size="sm" variant="cta" className="px-6 ml-auto mr-4" disabled={loading} isLoading={loading} onClick={joinGroup}>Join</Button >
    );
}

export default JoinGroup;