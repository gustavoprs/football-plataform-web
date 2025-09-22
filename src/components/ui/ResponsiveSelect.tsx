"use client"

import { CheckIcon, SearchIcon } from "lucide-react"
import type React from "react"
import { useState } from "react"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { cn } from "@/lib/utils"
import { removeAccents } from "@/lib/utils/string"
import { Button } from "./button"
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "./drawer"
import { Input } from "./input"
import { Label } from "./label"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Separator } from "./separator"

type Option<T> =
	| {
			value: T
			label: string
			searchLabel?: string
	  }
	| {
			value: T
			label: Exclude<React.ReactNode, string>
			searchLabel: string
	  }

type ResponsiveSelectProps<T> = {
	options: Array<Option<T>>
	defaultValue?: Array<T>
	value?: Array<T>
	onValueChange?: (value: Array<T>) => void
	className?: string
}

export default function ResponsiveSelect<T>({
	options,
	defaultValue,
	value: valueProp,
	onValueChange,
	className,
}: ResponsiveSelectProps<T>) {
	const isControlled = typeof valueProp !== "undefined"

	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [internalValue, setInternalValue] = useState<Array<T>>(
		defaultValue ?? [],
	)
	const [search, setSearch] = useState<string>("")

	const isMobile = useMediaQuery("(max-width: 640px)")

	const value = isControlled ? valueProp : internalValue

	function toggleOption(optionValue: T) {
		const newValue = value.includes(optionValue)
			? value.filter((v) => v !== optionValue)
			: [...value, optionValue]

		if (!isControlled) {
			setInternalValue(newValue)
		}

		onValueChange?.(newValue)
	}

	const filteredOptions = options.filter((option) => {
		const textToSearch =
			option.searchLabel ??
			(typeof option.label === "string" ? option.label : String(option.value))

		return removeAccents(textToSearch.trim())
			.toLowerCase()
			.includes(removeAccents(search.trim()).toLowerCase())
	})

	if (isMobile) {
		return (
			<Drawer open={isOpen} onOpenChange={setIsOpen}>
				<DrawerTrigger asChild>
					<Trigger amountSelected={value.length} className={className} />
				</DrawerTrigger>
				<DrawerContent>
					<DrawerTitle className="sr-only">
						Selecione as opções desejadas
					</DrawerTitle>
					<Label className="inline-flex items-center gap-2 mt-2 border-y px-4 w-full h-9">
						<SearchIcon className="size-4.5 text-muted-foreground" />
						<Input
							className="border-0 p-0 text-sm font-normal dark:bg-transparent bg-transparent shadow-none focus-visible:ring-0"
							placeholder="Buscar..."
							value={search}
							onInput={(e) => setSearch(e.currentTarget.value)}
						/>
					</Label>
					<div className="flex flex-col gap-1 p-2 overflow-y-auto">
						{filteredOptions.map((option) => (
							<Button
								key={String(option.value)}
								size="sm"
								variant="ghost"
								className="justify-start px-2.5 font-normal"
								onClick={() => toggleOption(option.value)}
							>
								<span className="size-4">
									{value.includes(option.value) && <CheckIcon />}
								</span>
								{option.label}
							</Button>
						))}
					</div>
				</DrawerContent>
			</Drawer>
		)
	}

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Trigger amountSelected={value.length} className={className} />
			</PopoverTrigger>
			<PopoverContent
				className="w-auto overflow-hidden p-0"
				align="end"
				alignOffset={-8}
				sideOffset={10}
			>
				<Label className="inline-flex items-center gap-2 px-3 w-full h-9">
					<SearchIcon className="size-4.5 text-muted-foreground" />
					<Input
						className="border-0 p-0 text-sm font-normal dark:bg-transparent bg-transparent shadow-none focus-visible:ring-0"
						placeholder="Buscar..."
						value={search}
						onInput={(e) => setSearch(e.currentTarget.value)}
					/>
				</Label>
				<Separator />
				<div className="flex flex-col p-1 max-h-72 overflow-y-auto">
					{filteredOptions.map((option) => (
						<Button
							key={String(option.value)}
							size="sm"
							variant="ghost"
							className="justify-between font-normal"
							onClick={() => toggleOption(option.value)}
						>
							{option.label}
							<span className="size-4">
								{value.includes(option.value) && <CheckIcon />}
							</span>
						</Button>
					))}
				</div>
			</PopoverContent>
		</Popover>
	)
}

type TriggerProps = { amountSelected: number } & React.ComponentProps<"button">

function Trigger({ amountSelected, className, ...rest }: TriggerProps) {
	return (
		<Button
			variant="outline"
			className={cn(
				"justify-between gap-4 px-2.5 w-40 font-normal shadow-none",
				className,
			)}
			{...rest}
		>
			{amountSelected > 0
				? amountSelected > 1
					? `${amountSelected} selecionados`
					: "1 selecionado"
				: "Nenhum selecionado"}
		</Button>
	)
}
