import TabLink from "@/components/layout/TabLink";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col flex-1">
			<div className="border-b">
				<div className=" flex justify-center items-center p-2">
					<h1 className="text-3xl font-semibold">Brasileirão Série A</h1>
				</div>
				<nav className="flex justify-center items-center gap-4">
					<TabLink href="/campeonatos/brasileirao-serie-a/tabela" name="Tabela" />
					<TabLink href="/campeonatos/brasileirao-serie-a/estatisticas" name="Estatísticas" disabled />
					<TabLink href="/campeonatos/brasileirao-serie-a/simulador" name="Simulador" disabled />
				</nav>
			</div>
			{children}
		</div>
	)
}

