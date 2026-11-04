"use server"

import Season from "@/types/Season";
import AnimeList from "@/types/AnimeListResponse";

const LIST_LIMIT = 5;
const LIST_FIELDS="id,title,main_picture,genres,num_episodes,media_type,start_date,start_season"
const ALL_FIELDS="id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics"


const CLIENT_ID = process.env.MAL_CLIENT_ID;

export async function searchAnime(query: string): Promise<AnimeList> {
    if (!CLIENT_ID) {
        throw new Error("MAL_CLIENT_ID is not configured");
    }
    const res = await fetch(`https://api.myanimelist.net/v2/anime?q=${query}&limit=${LIST_LIMIT}&fields=${LIST_FIELDS}`, {
        method: "GET",
        headers: {"X-MAL-CLIENT-ID": CLIENT_ID}
    })
    return await res.json();
}

export async function getSeasonalAnime(season: Season): Promise<AnimeList> {
    if (!CLIENT_ID) {
        throw new Error("MAL_CLIENT_ID is not configured");
    }
    const res = await fetch(`https://api.myanimelist.net/v2/anime/season/${season.year}/${season.season}?limit=${LIST_LIMIT}&fields=${LIST_FIELDS}`, {
        method: "GET",
        headers: {"X-MAL-CLIENT-ID": CLIENT_ID}
    })
    return await res.json();
}

export async function getAnimeDetails(id: number) {
    if (!CLIENT_ID) {
        throw new Error("MAL_CLIENT_ID is not configured");
    }
    const res = await fetch(`https://api.myanimelist.net/v2/anime/${id}?limit=${LIST_LIMIT}&fields=${ALL_FIELDS}`, {
        method: "GET",
        headers: {"X-MAL-CLIENT-ID": CLIENT_ID}
    })
    return await res.json();
}
