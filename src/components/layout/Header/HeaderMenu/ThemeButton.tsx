"use client"

import { CogIcon, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type ThemeButtonProps = {
	className?: string
}

export function ThemeButton({ className }: ThemeButtonProps) {
	const { setTheme } = useTheme()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className={cn("shadow-none cursor-pointer", className)}
				>
					<SunIcon className="size-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
					<MoonIcon className="absolute size-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
					<span className="sr-only">Mudar tema</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					className="cursor-pointer"
					onClick={() => setTheme("light")}
				>
					<SunIcon className="h-[1.2rem] w-[1.2rem]" />
					Claro
				</DropdownMenuItem>
				<DropdownMenuItem
					className="cursor-pointer"
					onClick={() => setTheme("dark")}
				>
					<MoonIcon className="h-[1.2rem] w-[1.2rem]" />
					Escuro
				</DropdownMenuItem>
				<DropdownMenuItem
					className="cursor-pointer"
					onClick={() => setTheme("system")}
				>
					<CogIcon />
					Sistema
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
