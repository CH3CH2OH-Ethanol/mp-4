import AnimeNode from "@/types/AnimeNode";
import Season from "@/types/Season";

interface AnimeListItem extends AnimeNode{
    genres?: {
        id: number;
        name: string;
    }[];
    num_episodes?: number;
    media_type?: string;
    start_date?: string;
    start_season?: Season;
}

export default AnimeListItem;
