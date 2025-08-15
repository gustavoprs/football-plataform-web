import { DialogClose } from "@radix-ui/react-dialog"
import Link from "next/link"
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import Trigger from "./Trigger"

export default function MobileNav() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Trigger />
			</DialogTrigger>
			<DialogContent
				showOverlay={false}
				className="top-[initial] left-0 bottom-0 translate-0 rounded-none border-0 max-w-screen w-screen h-[calc(100dvh-52.5px)] shadow-none [&>button:last-child]:hidden"
			>
				<DialogTitle className="sr-only">Menu</DialogTitle>
				<div className=" flex flex-col gap-2">
					<MobileNavLink href="/agenda" name="Agenda" />
					<MobileNavLink
						href="/campeonatos/brasileirao-serie-a"
						name="Brasileirão Série A"
					/>
					<MobileNavLink
						href="/campeonatos/copa-do-brasil"
						name="Copa do Brasil"
					/>
				</div>
			</DialogContent>
		</Dialog>
	)
}

function MobileNavLink({ href, name }: { href: string; name: string }) {
	return (
		<DialogClose asChild>
			<Link href={href} className="text-2xl font-medium hover:opacity-75">
				{name}
			</Link>
		</DialogClose>
	)
}
