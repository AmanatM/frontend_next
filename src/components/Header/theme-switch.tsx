"use client"

import * as React from "react"
import { Half2Icon, MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function ThemeSwitchDropdown() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function ThemeSwitch() {
  const { setTheme, resolvedTheme } = useTheme()

  return (
    <Button
      size="icon"
      variant="ghost"
      className="rounded-full"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      <Sun size={20} className="flex text-muted-foreground dark:hidden" />
      <Moon size={20} className="hidden text-muted-foreground dark:flex" />
    </Button>
  )
}

export function ThemeSwitcherSlider() {
  const { theme, setTheme } = useTheme()
  const [selectedTheme, setSelectedTheme] = useState<string>()

  useEffect(() => {
    setSelectedTheme(theme)
  }, [theme])

  return (
    <div className="bg-surface-primary dark:border-dark-border dark:bg-dark-surface-primary flex gap-0.5 rounded-full border border-border p-1 text-center">
      <SwitchButton selectedTheme={selectedTheme} setTheme={setTheme} theme="light">
        <SunIcon color="currentColor" height={16} width={16} />
      </SwitchButton>
      <SwitchButton selectedTheme={selectedTheme} setTheme={setTheme} theme="system">
        <Half2Icon color="currentColor" height={16} width={16} />
      </SwitchButton>
      <SwitchButton selectedTheme={selectedTheme} setTheme={setTheme} theme="dark">
        <MoonIcon color="currentColor" height={16} width={16} />
      </SwitchButton>
    </div>
  )
}

function SwitchButton({
  selectedTheme,
  theme,
  setTheme,
  children,
}: {
  selectedTheme?: string
  theme: string
  setTheme: (theme: string) => void
  children?: React.ReactNode
}) {
  return (
    <button
      aria-label={`${theme} theme`}
      className={cn(
        "!flex !size-6 items-center justify-center rounded-full !p-[3px]",
        selectedTheme === theme ? "bg-border" : "bg-transparent",
      )}
      data-selected={selectedTheme === theme}
      onClick={() => setTheme(theme)}
    >
      {children}
    </button>
  )
}
