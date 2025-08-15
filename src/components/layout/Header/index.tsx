import HeaderLogo from "./HeaderLogo"
import HeaderMenu from "./HeaderMenu"

export default function Header() {
	return (
		<header className="border-b p-2 bg-background">
			<div className="flex justify-between items-center mx-auto max-w-screen-xl">
				<HeaderLogo />
				<HeaderMenu />
			</div>
		</header>
	)
}
