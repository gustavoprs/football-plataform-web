import { formatDateTime } from "@/lib/utils/date"

type TwoLeggedTieCardProps = {
	firstTeamLabel: string
	secondTeamLabel: string
	firstLegDate?: Date
	secondLegDate?: Date
	index?: string
}

export default function TwoLeggedTiePlaceholderCard({
	firstTeamLabel,
	secondTeamLabel,
	firstLegDate,
	secondLegDate,
	index,
}: TwoLeggedTieCardProps) {

	return (
		<div className="relative flex flex-col justify-center items-center rounded-md border sm:flex-row md:flex-col lg:flex-row xl:flex-col">
			{index && (
				<span className="absolute -top-3 rounded-sm border py-0.5 px-1.5 text-xs bg-background">
					{index}
				</span>
			)}
			<div className="relative flex flex-col justify-center items-center gap-2 py-4 px-3 flex-1 h-full">
				{firstLegDate && <span className="w-full text-center text-xs font-light whitespace-nowrap">
					{formatDateTime(firstLegDate)}
				</span>}
				<div className="flex justify-between items-center gap-2 max-w-60 w-full">
					<div className="flex items-center gap-2">
						<span className="text-balance text-center">
							{firstTeamLabel}
						</span>
					</div>
					<div className="flex gap-1.5">
						<span className="text-lg font-extralight font-mono text-muted-foreground">
							x
						</span>
					</div>
					<div className="flex flex-row-reverse items-center gap-2">
						<span className="text-balance text-center">
							{secondTeamLabel}
						</span>
					</div>
				</div>
			</div>
			<hr className="absolute -z-1 w-full h-px bg-border sm:w-px sm:h-full md:w-full md:h-px lg:w-px lg:h-full xl:w-full xl:h-px" />
			<div className="relative flex flex-col items-center gap-2 py-4 px-3 flex-1 h-full">
				{secondLegDate && <span className="w-full text-center text-xs font-light whitespace-nowrap">
					{formatDateTime(secondLegDate)}
				</span>}
				<div className="flex justify-between items-center gap-2 max-w-60 w-full">
					<div className="flex items-center gap-2">
						<span className="text-balance text-center">
							{secondTeamLabel}
						</span>
					</div>
					<div className="flex gap-1.5">
						<span className="text-lg font-extralight font-mono text-muted-foreground">
							x
						</span>
					</div>
					<div className="flex flex-row-reverse items-center gap-2">
						<span className="text-balance text-center">
							{firstTeamLabel}
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}
