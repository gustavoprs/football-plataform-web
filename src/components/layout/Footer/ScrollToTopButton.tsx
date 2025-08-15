import { ChevronUpIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ScrollTopTopButton() {
	return (
		<Button
			size="icon"
			variant="ghost"
			className="border bg-background cursor-pointer hover:bg-background/50"
			onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
		>
			<ChevronUpIcon />
		</Button>
	)
}
