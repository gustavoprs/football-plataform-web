"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs } from "@/components/ui/tabs"

const phases = {
	"primeira-fase": "Primeira Fase",
	"segunda-fase": "Segunda Fase",
	"terceira-fase": "Terceira Fase",
	"oitavas-de-final": "Oitavas de Final",
	"quartas-de-final": "Quartas de Final",
	semifinal: "Semifinal",
	final: "Final",
} as const

const phaseKeys = Object.keys(phases) as (keyof typeof phases)[]

export default function PhaseTabs({ children }: { children: React.ReactNode }) {
	const [currentTab, setCurrentTab] =
		useState<keyof typeof phases>("primeira-fase")

	function nextPhase() {
		const index = phaseKeys.indexOf(currentTab)
		if (index < phaseKeys.length - 1) {
			setCurrentTab(phaseKeys[index + 1])
		}
	}

	function previousPhase() {
		const index = phaseKeys.indexOf(currentTab)
		if (index > 0) {
			setCurrentTab(phaseKeys[index - 1])
		}
	}

	return (
		<Tabs value={currentTab}>
			<div className="flex flex-col gap-5">
				<div className="flex justify-between items-center">
					<Button
						size="icon"
						variant="ghost"
						className="cursor-pointer"
						onClick={previousPhase}
						disabled={phaseKeys.indexOf(currentTab) === 0}
					>
						<ChevronLeft />
					</Button>
					<span className="text-center text-2xl font-semibold">
						{phases[currentTab]}
					</span>
					<Button
						size="icon"
						variant="ghost"
						className="cursor-pointer"
						onClick={nextPhase}
						disabled={phaseKeys.indexOf(currentTab) === phaseKeys.length - 1}
					>
						<ChevronRight />
					</Button>
				</div>
				{children}
			</div>
		</Tabs>
	)

	// <TabsList>
	// 	<TabsTrigger value="primeira-fase">Primeira Fase</TabsTrigger>
	// 	<TabsTrigger value="segunda-fase">Segunda-fase</TabsTrigger>
	// 	<TabsTrigger value="terceira-fase">Terceira-fase</TabsTrigger>
	// 	<TabsTrigger value="oitavas-de-final">Oitavas de Final</TabsTrigger>
	// 	<TabsTrigger value="quartas-de-final">Quartas de Final</TabsTrigger>
	// 	<TabsTrigger value="semifinal">Semifinal</TabsTrigger>
	// 	<TabsTrigger value="final">Final</TabsTrigger>
	// </TabsList>
}
