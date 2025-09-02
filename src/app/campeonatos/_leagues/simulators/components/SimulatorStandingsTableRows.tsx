"use client"

import { useLeague } from "../context/LeagueContext"
import SimulatorTableRow from "./SimulatorTableRow"

export default function SimulatorStandingsTableRows() {
	const {
		state: { standings },
	} = useLeague()

	return (
		<>
			{standings.map((data, index) => (
				<SimulatorTableRow key={data.id} position={index + 1} standing={data} />
			))}
		</>
	)
}
