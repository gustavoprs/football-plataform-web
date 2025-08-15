import { TabsContent } from "@/components/ui/tabs"
import { formatDateTime } from "@/lib/utils/date"
import PhaseTabs from "./PhaseTabs"

export default function Page() {
	return (
		<div className="p-4">
			<div className="flex flex-col mx-auto flex-1 max-w-screen-xl w-full">
				<section className="flex flex-col gap-3">
					<PhaseTabs>
						<TabsContent value="primeira-fase">
							<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
								{new Array(40).fill("").map((_, index) => (
									<MatchCard key={index} index={`Chave ${index + 1}`} />
								))}
							</div>
						</TabsContent>
						<TabsContent value="segunda-fase">
							<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
								{new Array(20).fill("").map((_, index) => (
									<MatchCard key={index} index={`Chave ${index + 1}`} />
								))}
							</div>
						</TabsContent>
						<TabsContent value="terceira-fase">
							<div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
								{new Array(16).fill("").map((_, index) => (
									<TwoLeggedTieCard key={index} index={`Chave ${index + 1}`} />
								))}
							</div>
						</TabsContent>
						<TabsContent value="oitavas-de-final">
							<div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
								{new Array(8).fill("").map((_, index) => (
									<TwoLeggedTieCard
										key={index}
										index={`Oitavas ${index + 1}`}
									/>
								))}
							</div>
						</TabsContent>
						<TabsContent value="quartas-de-final">
							{" "}
							<div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
								{new Array(4).fill("").map((_, index) => (
									<TwoLeggedTieCard
										key={index}
										index={`Quartas ${index + 1}`}
									/>
								))}
							</div>
						</TabsContent>
						<TabsContent value="semifinal">
							{" "}
							<div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
								{new Array(2).fill("").map((_, index) => (
									<TwoLeggedTieCard
										key={index}
										index={`Semifinal ${index + 1}`}
									/>
								))}
							</div>
						</TabsContent>
						<TabsContent value="final">
							<TwoLeggedTieCard index={"Final"} />
						</TabsContent>
					</PhaseTabs>
				</section>
			</div>
		</div>
	)
}

type MatchCardProps = {
	index?: string
}

export function MatchCard({ index }: MatchCardProps) {
	return (
		<div className="relative flex flex-col justify-center items-center gap-2 rounded-md border py-4 px-3 bg-card">
			{index && (
				<span className="absolute -top-3 rounded-sm border py-0.5 px-1.5 text-xs bg-background">
					{index}
				</span>
			)}
			<span className="w-full text-center text-xs font-light whitespace-nowrap">
				{formatDateTime(new Date())}
			</span>
			<div className="flex justify-between items-center gap-2 max-w-52 w-full">
				<div className="flex items-center gap-2">
					{/** biome-ignore lint/performance/noImgElement: <source domain not configured> */}
					<img
						src={"https://media.api-sports.io/football/teams/154.png"}
						alt={"Fortaleza"}
						loading="lazy"
						className="size-8 object-contain"
					/>
					<span>{"FOR"}</span>
				</div>
				<div className="flex gap-1.5">
					{true && <span className=" text-lg font-medium">{1}</span>}
					<span className="text-lg font-extralight font-mono text-muted-foreground">
						x
					</span>
					{true && <span className=" text-lg font-medium">{2}</span>}
				</div>
				<div className="flex flex-row-reverse items-center gap-2">
					{/** biome-ignore lint/performance/noImgElement: <source domain not configured> */}
					<img
						src={"https://media.api-sports.io/football/teams/131.png"}
						alt={"Corinthians"}
						loading="lazy"
						className="size-8 object-contain"
					/>
					<span>{"COR"}</span>
				</div>
			</div>
		</div>
	)
}

type TwoLeggedTieCardProps = {
	index?: string
}

function TwoLeggedTieCard({ index }: TwoLeggedTieCardProps) {
	return (
		<div className="relative flex flex-col justify-center items-center rounded-md border sm:flex-row md:flex-col lg:flex-row xl:flex-col">
			{index && (
				<span className="absolute -top-3 rounded-sm border py-0.5 px-1.5 text-xs bg-background">
					{index}
				</span>
			)}
			<div className="relative flex flex-col items-center gap-2 py-4 px-3 flex-1 h-full">
				<span className="w-full text-center text-xs font-light whitespace-nowrap">
					{formatDateTime(new Date())}
				</span>
				<div className="flex justify-between items-center gap-2 max-w-52 w-full">
					<div className="flex items-center gap-2">
						{/** biome-ignore lint/performance/noImgElement: <source domain not configured> */}
						<img
							src={"https://media.api-sports.io/football/teams/154.png"}
							alt={"Fortaleza"}
							loading="lazy"
							className="size-8 object-contain"
						/>
						<span>{"FOR"}</span>
					</div>
					<div className="flex gap-1.5">
						{true && <span className=" text-lg font-medium">{1}</span>}
						<span className="text-lg font-extralight font-mono text-muted-foreground">
							x
						</span>
						{true && <span className=" text-lg font-medium">{2}</span>}
					</div>
					<div className="flex flex-row-reverse items-center gap-2">
						{/** biome-ignore lint/performance/noImgElement: <source domain not configured> */}
						<img
							src={"https://media.api-sports.io/football/teams/131.png"}
							alt={"Corinthians"}
							loading="lazy"
							className="size-8 object-contain"
						/>
						<span>{"COR"}</span>
					</div>
				</div>
			</div>
			<hr className="absolute -z-1 w-full h-px bg-border sm:w-px sm:h-full md:w-full md:h-px lg:w-px lg:h-full xl:w-full xl:h-px" />
			<div className="relative flex flex-col items-center gap-2 py-4 px-3 flex-1 h-full">
				<span className="w-full text-center text-xs font-light whitespace-nowrap">
					{formatDateTime(new Date())}
				</span>
				<div className="flex justify-between items-center gap-2 max-w-52 w-full">
					<div className="flex items-center gap-2">
						{/** biome-ignore lint/performance/noImgElement: <source domain not configured> */}
						<img
							src={"https://media.api-sports.io/football/teams/154.png"}
							alt={"Fortaleza"}
							loading="lazy"
							className="size-8 object-contain"
						/>
						<span>{"FOR"}</span>
					</div>
					<div className="flex gap-1.5">
						{true && <span className=" text-lg font-medium">{1}</span>}
						<span className="text-lg font-extralight font-mono text-muted-foreground">
							x
						</span>
						{true && <span className=" text-lg font-medium">{2}</span>}
					</div>
					<div className="flex flex-row-reverse items-center gap-2">
						{/** biome-ignore lint/performance/noImgElement: <source domain not configured> */}
						<img
							src={"https://media.api-sports.io/football/teams/131.png"}
							alt={"Corinthians"}
							loading="lazy"
							className="size-8 object-contain"
						/>
						<span>{"COR"}</span>
					</div>
				</div>
			</div>
		</div>
	)
}
