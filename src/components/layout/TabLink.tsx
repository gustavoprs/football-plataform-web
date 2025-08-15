"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

type TabLinkProps = {
	href: string
	name: string
	disabled?: boolean
}

export default function TabLink({
	href,
	name,
	disabled = false,
}: TabLinkProps) {
	const path = usePathname()

	return (
		<Link
			href={href}
			className={cn(
				"flex flex-col items-center gap-1 w-28 text-lg transition-colors hover:text-foreground/75",
				disabled && "text-muted-foreground pointer-events-none",
			)}
			aria-disabled={disabled}
		>
			{name}
			<span
				className={cn(
					"rounded-t-full w-0 h-1 bg-primary transition-all",
					path === href && "w-full",
				)}
			></span>
		</Link>
	)
}
