"use client"
import { FC, useState } from "react";
import { Button } from "./ui/Button";
import { removeUserFromRoom } from "@/app/_actions/user";
import { useRouter } from "next/navigation";
import { LogOutIcon } from "lucide-react";
import { revalidatePath } from "next/cache";

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
        <Button size="sm" variant="cta" className="px-3 items-center" disabled={loading} isLoading={loading} onClick={leaveGroup}>Leave Room<LogOutIcon className="w-4 h-4 ml-3" /> </Button >
    );
}

export default JoinGroup;