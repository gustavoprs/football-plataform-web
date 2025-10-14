import { getTeamsByCompetitionID } from "@/lib/footballApi/teams"
import TeamSelectClient from "./TeamSelectClient"

export default async function TeamButton() {
	const teams = await getTeamsByCompetitionID(1, 2025)

	return <TeamSelectClient teams={teams} />
}
