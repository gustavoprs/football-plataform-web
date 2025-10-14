"use client"

import { ShieldIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import ResponsiveSelect from "@/components/ui/ResponsiveSelect"
import { deleteCookie, getCookie, setCookie } from "@/lib/utils/cookie"

type Team = {
	id: number
	name: string
	logoURL: string
}

type TeamSelectClientProps = {
	teams: Team[]
}

export default function TeamSelectClient({ teams }: TeamSelectClientProps) {
	const [team, setTeam] = useState<Team | null>(null)

	useEffect(() => {
		;(async () => {
			const savedId = await getCookie("selectedTeamId")

			if (savedId) {
				const savedTeam = teams.find((t) => t.id.toString() === savedId)
				if (savedTeam) setTeam(savedTeam)
			}
		})()
	}, [teams])

	async function handleTeamChange(v: number | null) {
		const selectedTeamId = teams.find((team) => team.id === v) || null
		setTeam(selectedTeamId)

		if (v) {
			await setCookie("selectedTeamId", v.toString(), 30)
		} else {
			await deleteCookie("selectedTeamId")
		}
	}

	const teamOptions = teams.map((team) => ({
		searchLabel: team.name,
		label: (
			<div className="inline-flex items-center gap-2">
				{/** biome-ignore lint/performance/noImgElement: <source domain not configured> */}
				<img
					src={team.logoURL}
					alt={`${team.name} escudo`}
					loading="lazy"
					className="size-5 overflow-hidden"
				/>
				{team.name}
			</div>
		),
		value: team.id,
	}))

	return (
		<ResponsiveSelect
			options={teamOptions}
			onValueChange={handleTeamChange}
			value={team?.id ?? null}
		>
			{team ? (
				<Button variant="ghost" size="icon">
					{/** biome-ignore lint/performance/noImgElement: <source domain not configured> */}
					<img
						src={team.logoURL}
						alt={`${team.name} escudo`}
						loading="lazy"
						className="size-6 overflow-hidden"
					/>
				</Button>
			) : (
				<Button variant="ghost" size="icon">
					<ShieldIcon className="size-5" />
				</Button>
			)}
		</ResponsiveSelect>
	)
}
