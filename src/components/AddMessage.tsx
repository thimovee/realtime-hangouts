"use client"
import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { type z } from "zod"
import { messageSchema } from "@/lib/validations/message"
import { Button } from "@/components/ui/Button"
import { Form, FormControl, FormItem, UncontrolledFormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { addMessage } from "@/app/_actions/message"
import { Loader, Send } from "lucide-react"

type Inputs = z.infer<typeof messageSchema>


export function AddMessageForm({ userrId, roomId }: { userrId: string, roomId: number }) {
    const [isPending, startTransition] = React.useTransition()
    const form = useForm<Inputs>({
        resolver: zodResolver(messageSchema),
        defaultValues: {
            content: "",
        },
    })

    function onSubmit(data: Inputs) {
        startTransition(async () => {
            try {
                await addMessage(roomId, userrId, data.content);
                form.reset()
            } catch (error) {
                error instanceof Error
                    ? toast.error(error.message)
                    : toast.error("Something went wrong, please try again.")
            }
        })
    }

    return (
        <Form {...form}>
            <form
                className="w-full mx-auto flex"
                onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
            >
                <FormItem className="w-full">
                    <FormControl>
                        <Input
                            aria-invalid={!!form.formState.errors.content}
                            placeholder="New message..."
                            {...form.register("content")}
                            autoComplete="off"
                        />
                    </FormControl>
                    <UncontrolledFormMessage className="text-red-400"
                        message={form.formState.errors.content?.message}
                    />
                </FormItem>
                <Button className="bg-primary hover:bg-primary/80 text-white h-10 rounded-l-none" disabled={isPending}>
                    {isPending ? (
                        <Loader
                            className="h-5 w-5 animate-spin"
                            aria-hidden="true"
                        />
                    ) : (
                        <Send className="h-5 w-5" />
                    )}
                    <span className="sr-only">Send Message</span>
                </Button>
            </form>
        </Form>
    )
}