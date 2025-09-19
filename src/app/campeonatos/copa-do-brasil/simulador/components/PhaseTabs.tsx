"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs } from "@/components/ui/tabs"

const phases = {
	// "primeira-fase_segunda-fase": "Primeira Fase - Segunda Fase",
	// "terceira-fase": "Terceira Fase",
	// "oitavas-de-final": "Oitavas de Final",
	"quartas-de-final_final": "Quartas de Final - Final",
} as const

const phaseKeys = Object.keys(phases) as (keyof typeof phases)[]

type Props = {
	defaultCurrentTab?: keyof typeof phases
	children: React.ReactNode
}

export default function PhaseTabs({ defaultCurrentTab = "quartas-de-final_final", children }: Props) {
	const [currentTab, setCurrentTab] =
		useState<keyof typeof phases>(defaultCurrentTab)

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
		<Tabs value={currentTab} className="flex-1">
			<div className="flex flex-col gap-5 flex-1">
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
