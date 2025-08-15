"use client"

import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarDaysIcon } from "lucide-react"
import { useState } from "react"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Calendar } from "./calendar"
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "./drawer"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

export default function ResponsiveDatePicker() {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [date, setDate] = useState<Date | undefined>(new Date())

	const isMobile = useMediaQuery("(max-width: 640px)")

	if (isMobile) {
		return (
			<Drawer open={isOpen} onOpenChange={setIsOpen}>
				<DrawerTrigger asChild>
					<Trigger date={date} />
				</DrawerTrigger>
				<DrawerContent className="px-2 pb-2">
					<DrawerHeader>
						<DrawerTitle>Selecione o Dia</DrawerTitle>
					</DrawerHeader>
					<div>
						<Calendar
							mode="single"
							selected={date}
							onSelect={(date) => {
								setDate(date)
								setIsOpen(false)
							}}
							locale={ptBR}
							className="w-full"
						/>
					</div>
				</DrawerContent>
			</Drawer>
		)
	}

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Trigger date={date} />
			</PopoverTrigger>
			<PopoverContent
				className="w-auto overflow-hidden p-0"
				align="end"
				alignOffset={-8}
				sideOffset={10}
			>
				<Calendar
					mode="single"
					selected={date}
					onSelect={(date) => {
						setDate(date)
						setIsOpen(false)
					}}
				/>
			</PopoverContent>
		</Popover>
	)
}

type TriggerProps = { date: Date | undefined } & React.ComponentProps<"button">

function Trigger({ date, className, ...rest }: TriggerProps) {
	return (
		<Button
			variant="outline"
			className={cn("justify-between gap-4 has-[>svg]:px-2.5 font-normal shadow-none", className)}
			{...rest}
		>
			<span>
				{formatDate(date ?? new Date(), "dd/MM/yyyy", {
					locale: ptBR,
				})}
			</span>
			<CalendarDaysIcon />
		</Button>
	)
}
