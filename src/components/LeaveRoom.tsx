"use client"
import { FC, useState } from "react";
import { Button } from "./ui/Button";
import { removeUserFromRoom } from "@/app/_actions/room";
import { useRouter } from "next/navigation";
import { LogOutIcon } from "lucide-react";

interface JoinGroupProps {
    roomId: number;
    userId: string;
}

const JoinGroup: FC<JoinGroupProps> = ({ roomId, userId }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const leaveGroup = async () => {
        setLoading(true)
        try {
            await removeUserFromRoom(roomId, userId)
            router.refresh()
            router.push(`/rooms`)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <Button size="xs" className="bg-red-400 hover:bg-red-500 text-white rounded-md px-3 items-center" disabled={loading} isLoading={loading} onClick={leaveGroup}>{!loading && <LogOutIcon className="w-4 h-4 mr-2" />}Leave Room</Button >
    );
}

export default JoinGroup;