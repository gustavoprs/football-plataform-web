import type { Match } from "./match"

export type Phase = {
	id: number
	name: string
	order: number
	type: "group_stage" | "knockout_single" | "knockout_two_legged"
	matches?: Match[]
	createdAt: Date
	updatedAt: Date  
}
