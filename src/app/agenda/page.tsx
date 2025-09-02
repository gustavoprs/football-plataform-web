import { getFilteredMatches } from "@/lib/footballApi/matches"
import { Content } from "./components/Content"

export default async function Page() {
	const matches = await getFilteredMatches({
		competitionIds: [1, 2, 3],
		year: 2025,
	})

	console.log(matches)

	return (
		<div className=" flex flex-col flex-1">
			<div className="border-b">
				<div className=" flex justify-center items-center p-2">
					<h1 className="text-3xl font-semibold">Agenda de Jogos</h1>
				</div>
			</div>
			<div className="p-4">
				<div className="flex flex-col mx-auto flex-1 max-w-screen-xl w-full">
					<Content matches={matches} />
				</div>
			</div>
		</div>
	)
}
