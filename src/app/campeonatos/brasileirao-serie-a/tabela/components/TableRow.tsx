import { cn } from "@/lib/utils"

type TableRowProps = {
	position: number
	data: {
		name: string
		code: string
		logo: string
	}
}

export default function TableRow({ position, data }: TableRowProps) {
	return (
		<div
			key={data.name}
			className={cn(
				"flex items-center !border-x h-10",
				position === 1 && "rounded-t-sm border-t",
				position === 20 && "rounded-b-sm !border-b",
				position % 2 !== 0 ? "bg-accent" : "bg-background",
			)}
		>
			<div
				className={cn(
					"sticky left-0 flex items-center gap-2 min-w-28 overflow-hidden",
					position % 2 !== 0 ? "bg-accent" : "bg-background",
				)}
			>
				<span
					className={cn(
						"rounded-r-full w-0.5 h-9",
						position >= 1 && position <= 4 && "bg-blue-500 dark:bg-blue-600",
						position >= 5 && position <= 6 && "bg-green-500 dark:bg-green-600",
						position >= 7 &&
							position <= 12 &&
							"bg-yellow-500 dark:bg-yellow-600",
						position >= 17 && position <= 20 && "bg-red-500 dark:bg-red-600",
					)}
				></span>
				<span className="w-5 text-center">{position}</span>
				<div className=" flex items-center gap-1.5">
					<div className="truncate">
						{/** biome-ignore lint/performance/noImgElement: <source domain not configured> */}
						<img
							src={data.logo}
							alt={data.name}
							loading="lazy"
							className="w-5 h-auto"
						/>
					</div>
					<span>{data.code}</span>
				</div>
			</div>
			<div className="flex-1 min-w-10 text-center font-medium">33</div>
			<div className="flex-1 min-w-10 text-center">15</div>
			<div className="flex-1 min-w-10 text-center">10</div>
			<div className="flex-1 min-w-10 text-center">3</div>
			<div className="flex-1 min-w-10 text-center">2</div>
			<div className="flex-1 min-w-10 text-center">27</div>
			<div className="flex-1 min-w-10 text-center">9</div>
			<div className="flex-1 min-w-10 text-center">18</div>
			<div className="flex-1 min-w-10 text-center">73</div>
			<div className="inline-flex justify-center gap-0.5 flex-1 min-w-20">
				<span
					className="rounded-full size-2 bg-green-500 dark:bg-green-600"
					title="Vitória"
				></span>
				<span
					className="rounded-full size-2 bg-foreground/25"
					title="Empate"
				></span>
				<span
					className="rounded-full size-2 bg-foreground/25"
					title="Empate"
				></span>
				<span
					className="rounded-full size-2 bg-red-500 dark:bg-red-600"
					title="Derrota"
				></span>
				<span
					className="rounded-full size-2 bg-green-500 dark:bg-green-600"
					title="Vitória"
				></span>
			</div>
		</div>
	)
}
