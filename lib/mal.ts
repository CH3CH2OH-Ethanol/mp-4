"use server";

import type Season from "@/types/Season";
import type AnimeListResponse from "@/types/AnimeListResponse";
import type AnimeDetail from "@/types/AnimeDetail";

type ApiResult<T> =
    | {ok: true; data: T}
    | {ok: false; error: string};

const LIST_LIMIT = 10;
const LIST_FIELDS = "id,title,main_picture,genres,num_episodes,media_type,start_date,start_season";
const DETAIL_FIELDS = "id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,media_type,status,genres,num_episodes,start_season,source,rating,studios";
const CLIENT_ID = process.env.MAL_CLIENT_ID;

function getErrorMessage(status: number): string {
    if (status === 401 || status === 403) {
        return "MyAnimeList could not authenticate this request. Check the API key.";
    }
    if (status === 429) {
        return "The MyAnimeList request limit has been reached. Please try again later.";
    }
    if (status >= 500) {
        return "MyAnimeList is temporarily unavailable. Please try again later.";
    }
    return `MyAnimeList returned an error (${status}).`;
}

async function requestMal<T>(url: string): Promise<ApiResult<T>> {
    if (!CLIENT_ID) {
        return {ok: false, error: "MAL_CLIENT_ID is not configured."};
    }

    try {
        const response = await fetch(url, {
            headers: {"X-MAL-CLIENT-ID": CLIENT_ID},
        });

        if (!response.ok) {
            return {ok: false, error: getErrorMessage(response.status)};
        }

        return {ok: true, data: await response.json() as T};
    } catch {
        return {ok: false, error: "Could not reach MyAnimeList. Check your connection and try again."};
    }
}

export async function searchAnime(query: string): Promise<ApiResult<AnimeListResponse>> {
    const normalizedQuery = query.trim();
    if (!normalizedQuery) {
        return {ok: false, error: "Enter an anime title before searching."};
    }

    const url = `https://api.myanimelist.net/v2/anime?q=${encodeURIComponent(normalizedQuery)}&limit=${LIST_LIMIT}&fields=${LIST_FIELDS}`;
    return requestMal<AnimeListResponse>(url);
}

export async function getSeasonalAnime(season: Season): Promise<ApiResult<AnimeListResponse>> {
    const url = `https://api.myanimelist.net/v2/anime/season/${season.year}/${season.season}?limit=${LIST_LIMIT}&fields=${LIST_FIELDS}`;
    return requestMal<AnimeListResponse>(url);
}

export async function getAnimeDetails(id: number): Promise<ApiResult<AnimeDetail>> {
    if (!Number.isInteger(id) || id <= 0) {
        return {ok: false, error: "This anime ID is invalid."};
    }

    const url = `https://api.myanimelist.net/v2/anime/${id}?fields=${DETAIL_FIELDS}`;
    return requestMal<AnimeDetail>(url);
}
