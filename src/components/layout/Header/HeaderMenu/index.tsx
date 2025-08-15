import { Separator } from "@/components/ui/separator"
import MobileNav from "./MobileNav"
import Nav from "./Nav"
import { ThemeButton } from "./ThemeButton"

export default function HeaderMenu() {
	return (
		<div className="flex items-center gap-2">
			<div className="hidden items-center gap-2 sm:flex">
				<Nav />
			</div>
			<Separator orientation="vertical" className="min-h-4 hidden sm:block" />
			<ThemeButton />
			<div className="flex items-center sm:hidden sm:has-[>button[data-state=open]]:flex">
				<MobileNav />
			</div>
		</div>
	)
}
