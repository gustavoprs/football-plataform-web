import { getAllMatches } from "@/lib/services/matches"
import { Content } from "./components/Content"

export default async function Page() {
	const matches = await getAllMatches()

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
