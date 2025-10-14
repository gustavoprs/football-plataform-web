"use client"

import ResponsiveSelect from "@/components/ui/ResponsiveSelect"
import { useLineup } from "../_context/LineupContext"

const formationsOptions = [
	{
		label: "3-5-2",
		value: "3-5-2",
	},
	{
		label: "3-4-3",
		value: "3-4-3",
	},
	{
		label: "4-2-3-1",
		value: "4-2-3-1",
	},
	{
		label: "4-3-3",
		value: "4-3-3",
	},
	{
		label: "4-4-2",
		value: "4-4-2",
	},
	{
		label: "5-3-2",
		value: "5-3-2",
	},
	{
		label: "5-4-1",
		value: "5-4-1",
	},
]

export default function FormationSelect() {
	const {
		dispatch,
		state: { formation },
	} = useLineup()

	return (
		<ResponsiveSelect
			options={formationsOptions}
			value={formation.join("-")}
			onValueChange={(value) =>
				value &&
				dispatch({
					type: "SET_FORMATION",
					payload: value.split("-").map((n) => Number(n)),
				})
			}
			className="w-28"
		/>
	)
}
