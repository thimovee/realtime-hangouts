"use client"
import { Toaster as RadToaster } from "sonner"

export function Toaster() {
    return (
        <RadToaster
            position="bottom-right"
            toastOptions={{
                style: {
                    background: "#191919",
                    color: "#ffd12b",
                    border: "1px solid #393939",
                },
            }}
        />
    )
}