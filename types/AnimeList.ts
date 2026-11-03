import AnimeNode from "@/types/AnimeNode";
import Season from "@/types/Season";

interface AnimeList {
    data: {node: AnimeNode}[];
    paging?: {previous?: string, next?: string};
    season?: Season;
}

export default AnimeList;