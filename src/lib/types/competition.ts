export type CompetitionType = 
	| "league"
	| "cup"
	| "tournament"
	| "friendly"

export type Competition = {
	id: number
	name: string
	type: CompetitionType
	logo: string
}