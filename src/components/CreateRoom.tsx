"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { type z } from "zod"
import { roomSchema } from "@/lib/validations/room"
import { Button } from "@/components/ui/Button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, UncontrolledFormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addRoom } from "@/app/_actions/room"
import { Loader } from "lucide-react"
import { useRouter } from "next/navigation"
import { Category } from "@prisma/client"

type Inputs = z.infer<typeof roomSchema>

export function CreateRoom({ categories }: { categories: Category[] }) {
    const [isPending, startTransition] = React.useTransition()
    const router = useRouter()
    const form = useForm<Inputs>({
        resolver: zodResolver(roomSchema),
        defaultValues: {
            capacity: 2,
            categoryId: 2,
        },
    })

    function onSubmit(data: Inputs) {
        startTransition(async () => {
            try {
                await addRoom({ ...data })
                router.back()
                router.refresh()
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
                className="grid w-full max-w-2xl gap-5"
                onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
            >
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input
                            aria-invalid={!!form.formState.errors.name}
                            placeholder="Type room name here."
                            {...form.register("name")}
                        />
                    </FormControl>
                    <UncontrolledFormMessage
                        message={form.formState.errors.name?.message}
                    />
                </FormItem>
                <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Input
                            aria-invalid={!!form.formState.errors.description}
                            placeholder="Type room description here."
                            {...form.register("description")}
                        />
                    </FormControl>
                    <UncontrolledFormMessage
                        message={form.formState.errors.description?.message}
                    />
                </FormItem>
                <div className="flex flex-col items-start gap-6 sm:flex-row">
                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Select
                                        value={field.value.toString()}
                                        onValueChange={(value: string) =>
                                            field.onChange(Number(value))
                                        }
                                    >
                                        <SelectTrigger className="capitalize">
                                            <SelectValue placeholder={field.name} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {categories.length > 0 && categories.map((category) => (
                                                    <SelectItem
                                                        key={category.id}
                                                        value={category.id.toString()}
                                                        className="capitalize"
                                                    >
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormItem className="w-full">
                        <FormLabel>Capacity</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                inputMode="numeric"
                                placeholder="Type room capacity here."
                                {...form.register("capacity", {
                                    valueAsNumber: true,
                                })}
                            />
                        </FormControl>
                        <UncontrolledFormMessage
                            message={form.formState.errors.capacity?.message}
                        />
                    </FormItem>
                </div>
                <Button className="w-full bg-primary mt-4 text-white hover:bg-primary/80" disabled={isPending}>
                    {isPending && (
                        <Loader
                            className="mr-2 h-4 w-4 animate-spin"
                            aria-hidden="true"
                        />
                    )}
                    Add Room
                    <span className="sr-only">Add Room</span>
                </Button>
            </form>
        </Form>
    )
}