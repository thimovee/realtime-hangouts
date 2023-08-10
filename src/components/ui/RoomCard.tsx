import { FunctionComponent } from "react";
import { buttonVariants } from "./Button";
import Image from "next/image";
import { ExtentedRoom } from "@/types/room";
import { Eye, User2 } from "lucide-react";
import { cn } from "@/lib/utils";
import JoinGroup from "../JoinGroup";

interface RoomCardProps {
    room: ExtentedRoom;
    userId: string;
    userInRoom: boolean;
}

const RoomCard: FunctionComponent<RoomCardProps> = ({ room, userId, userInRoom }) => {
    return (
        <div className='relative w-full h-60'>
            <div className="absolute top-0 left-0 w-full">
                <Image className='max-h-60 rounded-md border border-border' src={room.category.imageUrl} height={1000} width={1000} alt={room.name} />
            </div>
            <div className='rounded-md absolute top-0 left-0 w-full min-h-full z-10  bg-neutral-900 opacity-60' />
            <div className="py-4 absolute w-full h-full top-0 left-0 z-50 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                    <div className="bg-neutral-900 rounded-r-md p-4 pr-8 flex flex-col gap-1 max-w-fit">
                        <h2 className='font-bold text-lg text-white'>{room.name}</h2>
                        <p className="font-medium text-sm text-sky-500">{room.category.name}</p>
                    </div>
                    <span className="flex gap-2 items-center bg-neutral-900 text-white mr-4 p-2 rounded-md font-bold"> <User2 className='w-4 h-4 ' /> {room.users.length}/{room.capacity}</span>
                </div>
                {userInRoom ? (
                    <a className={cn(buttonVariants({ size: "sm", className: "bg-primary  text-white hover:bg-primary/80 px-6 ml-auto mr-4", }))} href={`/rooms/${room.id}`}>Enter</a>
                ) : (
                    <JoinGroup userId={userId} roomId={room.id} />
                )}
            </div>
        </div>
    );
}

export default RoomCard;