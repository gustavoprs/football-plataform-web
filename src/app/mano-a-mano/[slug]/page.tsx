import { Label } from "@/components/ui/label"
import { getTeamWithPlayers } from "@/lib/footballApi/teams"
import FormationSelect from "../_components/FormationSelect"
import Players from "../_components/Players"
import ResetButton from "../_components/ResetButton"
import Score from "../_components/Score"
import { LineupProvider } from "../_context/LineupContext"

export default async function Page({ params }: { params: { slug: string } }) {
	const slug = (await params).slug
	const ids = slug.split("-vs-")

	if (ids.length !== 2) {
		return <span>Url inválida!</span>
	}

	const homeTeam = await getTeamWithPlayers(Number(ids[0]))
	const awayTeam = await getTeamWithPlayers(Number(ids[1]))

	return (
		<div className="flex flex-col flex-1">
			<div className="border-b">
				<div className=" flex justify-center items-center p-2">
					<h1 className="text-3xl font-semibold">Mano a Mano</h1>
				</div>
			</div>
			<LineupProvider>
				<div className="flex flex-col justify-center items-center gap-10 mx-auto flex-1 p-4 max-w-screen-xl w-full">
					<div className="flex flex-col gap-4">
						<div className="flex justify-between items-center gap-2">
							<div>
								<Score homeTeam={homeTeam} awayTeam={awayTeam} />
							</div>
							<div className="flex items-center gap-2">
								<Label>
									Esquema: <FormationSelect />
								</Label>
								<ResetButton />
							</div>
						</div>
						<div className="rounded-2xl border-6 p-1.5 aspect-[1/1.5] w-[90vw] shadow-2xl border-neutral-400 dark:border-neutral-600 bg-[repeating-linear-gradient(0deg,_#31b442_0_9.1%,_#2f8f4a_9.1%_18.18%)] sm:w-auto sm:h-[75vh] sm:border-8 sm:p-5">
							<div className="relative rounded-xs border-4 size-full border-white sm:border-6">
								{/* Field markings */}
								<div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-1 bg-white sm:h-1.5"></div>
								<div className="absolute top-1/2 left-1/2 -translate-1/2 rounded-full border-4 aspect-square w-2/5 border-white sm:border-6"></div>
								<div className="absolute top-1/2 left-1/2 -translate-1/2 rounded-full aspect-square w-3 bg-white sm:w-4"></div>
								<div className="absolute top-0 left-1/2 -translate-x-1/2 rounded-xs border-x-4 border-b-4 aspect-video w-2/5 border-w border-white sm:border-x-6 sm:border-b-6"></div>
								<div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-xs border-x-4 border-t-4 aspect-video w-2/5 border-w border-white sm:border-x-6 sm:border-t-6"></div>
								<Players homeTeam={homeTeam} awayTeam={awayTeam} />
							</div>
						</div>
					</div>
				</div>
			</LineupProvider>
		</div>
	)
}
