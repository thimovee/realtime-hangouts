import { Message } from "@prisma/client";

export type ExtentedMessage = Message & {
    user: {
        name: string;
        image: string;
    };
}
