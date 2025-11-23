"use client"

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Player, PlayerPosition } from "@/lib/types/player"
import type { Team } from "@/lib/types/team"
import PlayerSelectButton from "./PlayerSelectButton"

type PlayerSelectProps = {
	defaultSelectedId: number | null
	onSelect?: (player: Player | null) => void
	homeTeam: Team
	awayTeam: Team
	homeTeamPlayers: Record<PlayerPosition, Player[]>
	awayTeamPlayers: Record<PlayerPosition, Player[]>
	defaultPosition: PlayerPosition
	className?: string
	children: React.ReactNode
}

export default function PlayerSelect({
	defaultSelectedId,
	onSelect,
	homeTeam,
	awayTeam,
	homeTeamPlayers,
	awayTeamPlayers,
	defaultPosition,
	className,
	children,
}: PlayerSelectProps) {
	return (
		<>
			<style>
				{`
				[data-slot="scroll-area-viewport"] > div {
					display: block !important;
				}
				`}
			</style>
			<Dialog>
				<DialogTrigger asChild>
					<button type="button" className={className}>
						{children}
					</button>
				</DialogTrigger>
				<DialogContent className="flex flex-col max-w-[100vw] sm:max-w-[750px] sm:w-full">
					<DialogHeader>
						<DialogTitle className="sr-only">Seleção de jogador</DialogTitle>
					</DialogHeader>
					<div className="relative grid grid-cols-2 gap-1 flex-1 sm:gap-10">
						<span className="z-10 absolute top-1/2 left-1/2 -translate-1/2 text-2xl font-bold text-muted-foreground">VS</span>
						<div className="flex flex-col gap-5 flex-1">
							<div className="flex items-center gap-2">
								{/** biome-ignore lint/performance/noImgElement: <source domain not configured> */}
								<img
									src={homeTeam.logoURL}
									alt={homeTeam.name}
									className="size-12 truncate"
								/>
								<span className="text-xl">{homeTeam.name}</span>
							</div>
							<Tabs
								defaultValue={defaultPosition}
								className="flex-1 max-h-[500px]"
							>
								<TabsList className="flex">
									<TabsTrigger value="goalkeeper" className="flex-none">
										GOL
									</TabsTrigger>
									<TabsTrigger value="defender" className="flex-none">
										DEF
									</TabsTrigger>
									<TabsTrigger value="midfielder" className="flex-none">
										MEI
									</TabsTrigger>
									<TabsTrigger value="attacker" className="flex-none">
										ATA
									</TabsTrigger>
								</TabsList>
								{Object.keys(homeTeamPlayers).map((position) => (
									<TabsContent
										key={position}
										value={position}
										className="h-9/10"
									>
										<ScrollArea className="h-full">
											{homeTeamPlayers[position as PlayerPosition].map((p) => (
												<DialogClose key={p.id} asChild>
													<PlayerSelectButton
														selected={p.id === defaultSelectedId}
														player={p}
														onClick={() => {
															if (onSelect)
																onSelect(p.id !== defaultSelectedId ? p : null)
														}}
													/>
												</DialogClose>
											))}
										</ScrollArea>
									</TabsContent>
								))}
							</Tabs>
						</div>
						<div className="flex flex-col gap-5 flex-1">
							<div className="flex flex-row-reverse items-center gap-2">
								{/** biome-ignore lint/performance/noImgElement: <source domain not configured> */}
								<img
									src={awayTeam.logoURL}
									alt={awayTeam.name}
									className="size-12 truncate"
								/>
								<span className="text-xl">{awayTeam.name}</span>
							</div>
							<Tabs
								defaultValue={defaultPosition}
								className="flex-1 max-h-[500px]"
							>
								<TabsList className="flex flex-row-reverse">
									<TabsTrigger value="goalkeeper" className="flex-none">
										GOL
									</TabsTrigger>
									<TabsTrigger value="defender" className="flex-none">
										DEF
									</TabsTrigger>
									<TabsTrigger value="midfielder" className="flex-none">
										MEI
									</TabsTrigger>
									<TabsTrigger value="attacker" className="flex-none">
										ATA
									</TabsTrigger>
								</TabsList>
								{Object.keys(awayTeamPlayers).map((position) => (
									<TabsContent
										key={position}
										value={position}
										className="h-9/10"
									>
										<ScrollArea className="h-full">
											{awayTeamPlayers[position as PlayerPosition].map((p) => (
												<DialogClose key={p.id} asChild>
													<PlayerSelectButton
														selected={p.id === defaultSelectedId}
														player={p}
														inverted
														onClick={() => {
															if (onSelect)
																onSelect(p.id !== defaultSelectedId ? p : null)
														}}
													/>
												</DialogClose>
											))}
										</ScrollArea>
									</TabsContent>
								))}
							</Tabs>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	)
}
