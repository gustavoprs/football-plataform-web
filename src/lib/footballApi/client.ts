import type { ApiResponse } from "./types"

export const API_BASE_URL =
	process.env.NEXT_PUBLIC_FOOTBALL_API_URL || "http://localhost:8080/api"

export async function apiFetch<T>(
	path: string,
	options?: RequestInit,
): Promise<T> {
	const res = await fetch(`${API_BASE_URL}${path}`, {
		...options,
		headers: {
			"Content-Type": "application/json",
			...options?.headers,
		},
		next: { revalidate: 60 },
	})

	if (!res.ok) {
		throw new Error(`API request failed: ${res.status} ${res.statusText}`)
	}

	const json: ApiResponse<T> = await res.json()

	if (json.status === "error") {
		throw new Error(`API Error ${json.error.code}: ${json.error.message}`)
	}

	return json.data
}
