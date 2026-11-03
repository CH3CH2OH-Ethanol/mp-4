import AnimeNode from "@/types/AnimeNode";
import Season from "@/types/Season";


// curl 'https://api.myanimelist.net/v2/anime/30230?fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics' \
// -H 'Authorization: Bearer YOUR_TOKEN'
interface AnimeDetail extends AnimeNode {
    alternative_titles?: {
        synonyms?: string[];
        en?: string;
        ja?: string;
    };
    start_date?: string;
    end_date?: string;
    synopsis?: string;
    mean?: number;
    rank?: number;
    popularity?: number;
    num_list_users?: number;
    nsfw?: string;
    created_at?: string;
    updated_at?: string;
    media_type?: string;
    status?: string;
    genres?: {
        id: number;
        name: string;
    }[];
    num_episodes?: number;
    start_season?: Season;
    broadcast?: {
        day_of_the_week: string;
        start_time: string;
    };
    source: string;
    average_episode_duration?: number;
    rating?: string;
    pictures?: {
        medium: string;
        large: string;
    }[];
    background?: string;
    related_anime?: {
        node: AnimeNode;
        relation_type: string;
        relation_type_formatted: string;
    }[];
    studios?:{
        id: number;
        name: string;
    };
    statistics?: {
        status: {
            watching: string;
            completed: string;
            on_hold: string;
            dropped: string;
            plan_to_watch: string;
        };
        num_list_users: number;
    }
}

export default AnimeDetail;