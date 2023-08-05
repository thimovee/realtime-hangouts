import { Category, Message, Room, User } from "@prisma/client";

export type ExtentedRoom = Room & {
    category: Category;
    categoryName: String;
    messages: Message[];
    users: User[];
}