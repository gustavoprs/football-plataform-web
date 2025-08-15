import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import { ThemeProvider } from "@/components/theme-provider"

const font = Geist({
	variable: "--font-sans",
	subsets: ["latin"],
})

const fontMono = Geist_Mono({
	variable: "--font-mono",
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "",
	description: "",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-BR">
			<body
				id="body"
				className={`${font.variable} ${fontMono.variable} antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<div className="relative flex flex-col h-dvh">
						<Header />
						{children}
						<Footer />
					</div>
				</ThemeProvider>
			</body>
		</html>
	)
}
