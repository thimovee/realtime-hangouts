'use client';
import { useEffect, useRef, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";
import { cn, formatTimeToNow } from "@/lib/utils";
import { UserAvatar } from "./UserAvatar";
import { ExtentedMessage } from "@/types/message";
interface BodyProps {
    initialMessages: ExtentedMessage[];
    roomId: number;
    userId: String;
}

const Body: React.FC<BodyProps> = ({ initialMessages = [], roomId, userId }) => {
    const roomIdString = String(roomId);
    const bottomRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState(initialMessages);
    const [isClient, setIsClient] = useState(false);


    useEffect(() => {
        setIsClient(true);
        pusherClient.subscribe(roomIdString)
        bottomRef?.current?.scrollIntoView();
        const messageHandler = (message: ExtentedMessage) => {
            setMessages((current) => {
                if (find(current, { id: message.id })) {
                    return current;
                }

                return [...current, message]
            });

            bottomRef?.current?.scrollIntoView();
        };

        const updateMessageHandler = (newMessage: ExtentedMessage) => {
            setMessages((current) => current.map((currentMessage) => {
                if (currentMessage.id === newMessage.id) {
                    return newMessage;
                }

                return currentMessage;
            }))
        };


        pusherClient.bind('messages:new', messageHandler)
        pusherClient.bind('message:update', updateMessageHandler);

        return () => {
            pusherClient.unsubscribe(roomIdString)
            pusherClient.unbind('messages:new', messageHandler)
            pusherClient.unbind('message:update', updateMessageHandler)
        }
    }, [roomIdString]);

    return (
        <div className="flex-1 overflow-y-auto z-0">
            {messages.map((message) => (
                <div className={cn(
                    "w-full flex",
                    message.userId === userId ? "justify-end" : "justify-start"
                )} key={message.id}>
                    <div className={cn(
                        "flex gap-3 my-10 items-center",
                        message.userId === userId ? "justify-end" : "justify-start flex-row-reverse"
                    )}>
                        <div className="flex flex-col gap-3">
                            <div className={cn(
                                "flex gap-2 items-center",
                                message.userId === userId ? "ml-auto" : "mr-auto"
                            )}>
                                <h2 className="text-slate-900 dark:text-slate-300 font-semibold">{message.user.name}</h2>
                                {isClient && <span className="text-sm text-slate-700 dark:text-slate-500">{formatTimeToNow(new Date(message.createdAt))}</span>}
                            </div>
                            <span className={cn(
                                "rounded-lg p-4 py-2 text-sm max-w-xs md:max-w-xl break-words",
                                message.userId === userId ? "bg-primary text-white" : "bg-muted"
                            )} >{message.content}</span>
                        </div>
                        <div>
                            <UserAvatar user={{ name: message.user.name || null, image: message.user.image || null }} />
                        </div>
                    </div>
                </div>
            ))}
            <div className="pt-10" ref={bottomRef} />
        </div>
    );
}

export default Body;