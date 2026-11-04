"use client"

import {useState} from "react";
import AnimeListResponse from "@/types/AnimeListResponse";
import {searchAnime} from "@/lib/mal";
import AnimeList from "@/components/AnimeList";

function SearchPage(){
    const [animeList, setAnimeList] = useState<AnimeListResponse>({data: []});
    const [searchText, setSearchText] = useState('');

    async function search(){
        searchAnime(searchText).then((data)=>{
            console.log(data);
            setAnimeList(data)
        });
    }

    return (
        <main>
            <input
                type="text"
                onChange={(e) => setSearchText(e.target.value)}
            />
            <button onClick={search}>Search</button>

            <AnimeList list={animeList.data} />
        </main>
    )
}

export default SearchPage;
