export async function setCookie(name: string, value: string, days: number) {
	const expires = Date.now() + days * 24 * 60 * 60 * 1000
	await cookieStore.set({
		name,
		value,
		expires,
		path: "/",
	})
}

export async function getCookie(name: string): Promise<string | null> {
	const cookie = await cookieStore.get(name)
	return cookie?.value ?? null
}

export async function deleteCookie(name: string) {
	await cookieStore.delete(name)
}