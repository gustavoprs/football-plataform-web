"use client"

import { formatDate, isEqual } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarDaysIcon } from "lucide-react"
import { useState } from "react"
import type { DateRange } from "react-day-picker"
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

type ResponsiveDateRangePickerProps = {
	value?: DateRange | undefined
	onValueChange?: (value: DateRange | undefined) => void
	className?: string
}

export default function ResponsiveDateRangePicker({
	value: valueProp,
	onValueChange,
	className,
}: ResponsiveDateRangePickerProps) {
	const isControlled = typeof valueProp !== "undefined"

	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [internalValue, setInternalValue] = useState<DateRange | undefined>({
		from: new Date(),
		to: new Date(),
	})

	const isMobile = useMediaQuery("(max-width: 640px)")

	const value = isControlled ? valueProp : internalValue

	function handleSelect(date: DateRange | undefined) {
		if (!isControlled) {
			setInternalValue(date)
		}

		onValueChange?.(date)
	}

	if (isMobile) {
		return (
			<Drawer open={isOpen} onOpenChange={setIsOpen}>
				<DrawerTrigger asChild>
					<Trigger date={value} className={className} />
				</DrawerTrigger>
				<DrawerContent className="px-2 pb-2">
					<DrawerHeader>
						<DrawerTitle>Selecione o intervalo</DrawerTitle>
					</DrawerHeader>
					<div>
						<Calendar
							mode="range"
							selected={value}
							onSelect={handleSelect}
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
				<Trigger date={value} className={className} />
			</PopoverTrigger>
			<PopoverContent
				aria-description="Selecione uma data"
				className="w-auto overflow-hidden p-0"
				align="end"
				alignOffset={-8}
				sideOffset={10}
			>
				<Calendar mode="range" selected={value} onSelect={handleSelect} />
			</PopoverContent>
		</Popover>
	)
}

type TriggerProps = {
	date: DateRange | undefined
} & React.ComponentProps<"button">

function Trigger({ date, className, ...rest }: TriggerProps) {
	return (
		<Button
			variant="outline"
			className={cn(
				"justify-between gap-1 has-[>svg]:px-2.5 w-56 font-normal shadow-none",
				className,
			)}
			{...rest}
		>
			<span>{getFormattedDateLabel(date)}</span>
			<CalendarDaysIcon />
		</Button>
	)
}

function getFormattedDateLabel(date: DateRange | undefined): string {
	if (!date) return "Não selecionado"

	const { from, to } = date
	if (!from) return "Não selecionado"

	if (from && to && isEqual(from, to)) {
		return formatDate(from, "dd/MM/yyyy", { locale: ptBR })
	}

	const formattedFrom = formatDate(from, "dd/MM/yyyy", { locale: ptBR })
	const formattedTo = to
		? formatDate(to, "dd/MM/yyyy", { locale: ptBR })
		: "..."
	return `${formattedFrom} a ${formattedTo}`
}
