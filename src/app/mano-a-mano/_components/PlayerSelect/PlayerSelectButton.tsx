import type { Player } from "@/lib/types/player"
import { cn } from "@/lib/utils"

type Props = {
	selected?: boolean
	player: Player
	inverted?: boolean
} & React.ComponentProps<"button">

export default function PlayerSelectButton({
	selected = false,
	player,
	inverted = false,
	onClick,
}: Props) {
	return (
		<button
			key={player.id}
			type="button"
			className={cn(
				"flex justify-start items-center gap-2 mb-1 rounded-md border p-2 w-full border-transparent cursor-pointer transition-colors hover:bg-accent",
				inverted && "flex-row-reverse",
				selected && "border-primary/25 bg-primary/10 hover:bg-primary/5",
			)}
			onClick={onClick}
		>
			{/** biome-ignore lint/performance/noImgElement: <source domain not configured> */}
			<img
				src={player.photoUrl}
				alt={player.name}
				className="rounded-full border size-12 object-cover sm:size-16"
			/>
			<div
				className={cn(
					"flex flex-col items-start flex-1 w-8/12",
					inverted && "items-end",
				)}
			>
				<span
					className={cn(
						"inline-flex items-center gap-1 w-full",
						inverted && "flex-row-reverse",
					)}
				>
					<span className="font-semibold">{player.number}</span>
					<span
						className={cn(
							"pe-4 text-start truncate",
							inverted && "text-end pe-0 ps-4",
						)}
					>
						{player.name}
					</span>
				</span>
				<div
					className={"flex items-center gap-2 text-sm text-muted-foreground"}
				>
					{/* <span>{getPositionLabel(player.position)}</span> */}
					{player.age !== null && (
						<>
							{/* <span>•</span> */}
							<span>{player.age} anos</span>
						</>
					)}
				</div>
			</div>
		</button>
	)
}
