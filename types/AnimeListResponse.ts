import Season from "@/types/Season";
import AnimeListItem from "@/types/AnimeListItem";

interface AnimeListResponse {
    data: {node: AnimeListItem}[];
    paging?: {previous?: string, next?: string};
    season?: Season;
}

export default AnimeListResponse;