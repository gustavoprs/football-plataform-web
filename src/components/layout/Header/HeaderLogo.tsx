import Link from "next/link"

export default function HeaderLogo() {
	return (
		<Link
			href="/"
			className="rounded-tl-md rounded-tr-xs rounded-br-md rounded-bl-xs text-xl pb-0.5 px-2 bg-primary text-primary-foreground transition-colors hover:bg-primary/85"
		>
			<span className="relative top-px">Sideline</span>
		</Link>
	)
}
