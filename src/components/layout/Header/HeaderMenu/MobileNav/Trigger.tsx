"use client"

import { MenuIcon, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

type TriggerProps = React.ComponentProps<"button">

export default function Trigger({ className, onClick, ...rest }: TriggerProps) {
	return (
		<Button
			variant="ghost"
			size="icon"
			className="group relative cursor-pointer"
			onClick={(e) => {
				window.scrollTo({ top: 0, behavior: "smooth" })
				if (onClick) onClick(e)
			}}
			{...rest}
		>
			<MenuIcon className="absolute inset-0 m-auto size-6 transition-all duration-300 group-data-[state=open]:opacity-0 group-data-[state=open]:rotate-90 group-data-[state=open]:scale-75" />
			<XIcon className="absolute inset-0 m-auto size-6 opacity-0 rotate-90 scale-75 transition-all duration-300 group-data-[state=open]:opacity-100 group-data-[state=open]:rotate-0 group-data-[state=open]:scale-100" />
		</Button>
	)
}
