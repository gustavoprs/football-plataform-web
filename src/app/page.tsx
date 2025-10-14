import MatchesSection from "./components/MatchesSection"
import SerieAStandingsSection from "./components/SerieAStandingsSection"
import SerieBStandingsSection from "./components/SerieBStandingsSection"

export default async function Home() {
	return (
		<div className="flex flex-col py-8 px-4">
			<div className="flex flex-col gap-10 mx-auto max-w-screen-xl w-full">
				<div className="flex flex-col gap-10">
					<MatchesSection />
					<section className=" grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
						<SerieAStandingsSection />
						<SerieBStandingsSection />
					</section>
				</div>
			</div>
		</div>
	)
}
