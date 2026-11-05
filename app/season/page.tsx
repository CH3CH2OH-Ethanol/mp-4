import {Suspense} from "react";
import {getSeasonalAnime} from "@/lib/mal";
import type Season from "@/types/Season";
import AnimeList from "@/components/AnimeList";
import PageLayout, {StatusMessage} from "@/components/PageLayout";

const CURRENT_SEASON: Season = {
    year: 2026,
    season: "fall",
};

export const metadata = {
    title: "This Season",
};

async function SeasonList() {
    const result = await getSeasonalAnime(CURRENT_SEASON);

    if (!result.ok) {
        return <StatusMessage tone="error">{result.error}</StatusMessage>;
    }

    return <AnimeList list={result.data.data} />;
}

export default function Home() {
    return (
        <PageLayout
            eyebrow={`${CURRENT_SEASON.season} ${CURRENT_SEASON.year}`}
            title="This Season"
            description="Anime airing this season, powered by the MyAnimeList API."
        >
            <Suspense fallback={<StatusMessage>Loading anime...</StatusMessage>}>
                <SeasonList />
            </Suspense>
        </PageLayout>
    );
}
