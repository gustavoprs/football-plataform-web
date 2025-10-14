"use client"

import { RotateCcwIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLineup } from "../_context/LineupContext"

export default function ResetButton() {
	const { dispatch } = useLineup()

	return (
		<Button
			size="icon"
			variant="outline"
			className="shadow-none"
			onClick={() => dispatch({ type: "RESET_LINEUP" })}
		>
			<RotateCcwIcon />
		</Button>
	)
}
