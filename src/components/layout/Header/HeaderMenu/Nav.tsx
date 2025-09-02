import Link from "next/link"
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

type LinkItem = {
	href: string
	image?: string
	title: string
	description?: string
}

const championshipLinks: LinkItem[] = [
	{
		href: "/campeonatos/brasileirao-serie-a",
		image: "https://media.api-sports.io/football/leagues/71.png",
		title: "Brasileirão Série A",
		description: "",
	},
	{
		href: "/campeonatos/brasileirao-serie-b",
		image: "https://media.api-sports.io/football/leagues/72.png",
		title: "Brasileirão Série B",
		description: "",
	},
	{
		href: "/campeonatos/copa-do-brasil",
		image: "https://media.api-sports.io/football/leagues/73.png",
		title: "Copa do Brasil",
		description: "",
	},
]

const simulatorLinks: {
	image?: string
	href: string
	title: string
	description?: string
}[] = [
	{
		href: "/campeonatos/brasileirao-serie-a/simulador",
		image: "https://media.api-sports.io/football/leagues/71.png",
		title: "Brasileirão Série A",
		description:
			"Simule os jogos do Brasileirão Série A e veja como a tabela pode mudar.",
	},
	{
		href: "/campeonatos/brasileirao-serie-b/simulador",
		image: "https://media.api-sports.io/football/leagues/72.png",
		title: "Brasileirão Série B",
		description:
			"Simule os jogos do Brasileirão Série B e veja como a tabela pode mudar.",
	},
	{
		href: "/campeonatos/copa-do-brasil/simulador",
		image: "https://media.api-sports.io/football/leagues/73.png",
		title: "Copa do Brasil",
		description:
			"Simule confrontos da Copa do Brasil e acompanhe o avanço dos times.",
	},
]

export default function Nav() {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuLink className="font-medium" asChild>
					<Link href="/agenda">Agenda</Link>
				</NavigationMenuLink>
				<NavigationMenuItem>
					<Link href="/campeonatos">
						<NavigationMenuTrigger className="cursor-pointer">
							Campeonatos
						</NavigationMenuTrigger>
					</Link>
					<NavigationMenuContent>
						<div className="grid w-[300px] gap-1">
							{championshipLinks.map((link) => (
								<Item key={link.href} link={link} />
							))}
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Simuladores</NavigationMenuTrigger>
					<NavigationMenuContent>
						<div className="grid w-[300px] gap-1">
							{simulatorLinks.map((link) => (
								<Item key={link.href} link={link} />
							))}
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	)
}

function Item({ link }: { link: LinkItem }) {
	return (
		<Link
			href={link.href}
			data-slot="navigation-menu-link"
			className="data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4"
		>
			<div className="inline-flex items-center gap-2 font-medium">
				{link.image && (
					// biome-ignore lint/performance/noImgElement: <hostname not configured>
					<img
						src={link.image}
						alt={`Logo do campeonato ${link.title}`}
						loading="lazy"
						width={20}
						height={20}
					/>
				)}
				<span>{link.title}</span>
			</div>
			{link.description && (
				<div className="text-muted-foreground">{link.description}</div>
			)}
		</Link>
	)
}
