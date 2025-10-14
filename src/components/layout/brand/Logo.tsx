import Link from "next/link"
import { cn } from "@/lib/utils"

type LogoProps = {
	className?: string
}

export default function Logo({ className }: LogoProps) {
	return (
		<Link
			href="/"
			className={cn(
				"rounded-tl-md rounded-tr-xs rounded-br-md rounded-bl-xs text-xl pb-0.5 px-2 bg-primary text-primary-foreground transition-colors hover:bg-primary/85",
				className,
			)}
		>
			<span className="relative top-px">Sideline</span>
		</Link>
	)
}
