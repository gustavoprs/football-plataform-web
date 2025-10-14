import { PlusIcon } from "lucide-react"
import type { Player } from "@/lib/types/player"
import { cn } from "@/lib/utils"

type Props = {
	player: Player | null
	className?: string
}

export default function PlayerButton({ player, className }: Props) {
	return (
		<div className={cn("size-full", className)}>
			{player ? (
				<div
					className={cn(
						"group relative border-3 rounded-full size-full border-neutral-500 bg-neutral-100",
					)}
				>
					{/** biome-ignore lint/performance/noImgElement: <source domain not configured> */}
					<img
						src={player.photoUrl}
						alt={player.name}
						className="rounded-full object-cover bg-neutral-100 transition-opacity group-hover:opacity-85"
					/>
					{player.team && (
						// biome-ignore lint/performance/noImgElement: <source domain not configured>
						<img
							src={player.team?.logoURL}
							alt={player.name}
							className="absolute -bottom-px -right-3 w-1/2"
						/>
					)}
					<span className="absolute top-full left-1/2 -translate-x-1/2 m-1 rounded-md py-0.5 px-1.5 max-w-[160%] text-nowrap text-sm font-medium truncate bg-black/35 text-white">
						{player.name}
					</span>
				</div>
			) : (
				<div
					className={cn(
						"flex justify-center items-center border-3 rounded-full size-full border-neutral-500 bg-neutral-100 text-neutral-400 transition-colors hover:bg-neutral-100/85",
					)}
				>
					<PlusIcon className="size-2/3" />
				</div>
			)}
		</div>
	)
}
