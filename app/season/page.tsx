import {getSeasonalAnime} from "@/lib/mal";
import Season from "@/types/Season";
import AnimeList from "@/components/AnimeList";

const CURRENT_SEASON: Season = {
    year: 2026,
    season: "fall"
}

async function SeasonAnime(){
    const list = await getSeasonalAnime(CURRENT_SEASON);

    return (
        <AnimeList list={list.data} />
    )
}

export default SeasonAnime;
