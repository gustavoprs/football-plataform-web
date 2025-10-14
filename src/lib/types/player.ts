import type { Team } from "./team"

export type PlayerPosition =
	| "goalkeeper"
	| "defender"
	| "midfielder"
	| "attacker"

export type Player = {
	id: number
	name: string
	age: number | null
	number: number | null
	position: PlayerPosition | null
	photoUrl: string
	teamId: Team["id"] | null
	createdAt: Date
	updatedAt: Date
	team?: Team
}

export function getPositionLabel(
	position: PlayerPosition | null,
	locale: "pt" | "en" = "pt",
) {
	const labels =
		locale === "en"
			? {
					goalkeeper: "Goalkeeper",
					defender: "Defender",
					midfielder: "Midfielder",
					attacker: "Attacker",
				}
			: {
					goalkeeper: "Goleiro",
					defender: "Defensor",
					midfielder: "Meio-campista",
					attacker: "Atacante",
				}

	return position ? labels[position] : "Sem posição"
}
