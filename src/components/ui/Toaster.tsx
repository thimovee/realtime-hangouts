"use client"
import { Toaster as RadToaster } from "sonner"

export function Toaster() {
    return (
        <RadToaster
            position="bottom-right"
            toastOptions={{
                style: {
                    background: "#191919",
                    color: "#FFFFFF",
                    border: "1px solid #393939",
                },
            }}
        />
    )
}