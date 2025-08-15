"use client"

import Logo from "../brand/Logo"
import ScrollTopTopButton from "./ScrollToTopButton"

export default function Footer() {
	return (
		<footer className="mt-auto border-t p-4 bg-muted">
			<div className="flex justify-between items-center mx-auto max-w-screen-xl">
				<Logo className="text-2xl" />
				<ScrollTopTopButton />
			</div>
		</footer>
	)
}
