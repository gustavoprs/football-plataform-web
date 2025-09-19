import { getPhases } from "@/lib/footballApi/phases"
import FinalPhasesSimulator from "./components/simulators/FinalPhasesSimulator"

export default async function Page() {
	const phasesData = await getPhases(3, 2025)

	const phases = phasesData.map((phase) => {
		if (!phase.matches) {
			return phase
		}

		return {
			...phase,
			matches: phase.matches.map((match) => {
				if (match.status !== "finished") {
					match.score.fullTime.home = -1
					match.score.fullTime.away = -1
				}

				return match
			}),
		}
	})

	return (
		<div className="flex flex-col p-4 flex-1">
			<div className="flex flex-col mx-auto flex-1 max-w-screen-xl w-full">
				<section className="flex flex-col gap-3 flex-1">
					<FinalPhasesSimulator phases={phases} />
				</section>
			</div>
		</div>
	)
}
