import Link from "next/link"
import Nav from "./Nav"

export default function Header() {
	return (
		<header className="border-b p-2">
			<div className=" flex justify-between items-center mx-auto max-w-screen-xl px-4">
				<div>
					<Link
						href="/"
						className="rounded-tl-md rounded-tr-xs rounded-br-md rounded-bl-xs text-xl pb-0.5 px-2 bg-primary text-primary-foreground"
					>
						LOGO
					</Link>
				</div>
				<div className=" flex items-center gap-2">
					<Nav />
				</div>
			</div>
		</header>
	)
}
