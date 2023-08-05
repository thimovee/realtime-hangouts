"use client"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/Button"
import { Moon, Sun } from "lucide-react"

export function ToggleTheme() {
  const { setTheme, theme } = useTheme()

  return (
    <Button className="text-black hover:bg-slate-100 dark:hover:bg-neutral-800 dark:text-white" variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      <Sun className=" h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" aria-hidden="true" />
      <Moon className=" absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" aria-hidden="true" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}