"use client";

import {type SubmitEvent, useState} from "react";
import {styled} from "styled-components";
import type AnimeListResponse from "@/types/AnimeListResponse";
import {searchAnime} from "@/lib/mal";
import AnimeList from "@/components/AnimeList";
import PageLayout, {StatusMessage} from "@/components/PageLayout";

const SearchForm = styled.form`
    margin-bottom: 28px;
    display: flex;
    gap: 10px;

    @media screen and (max-width: 560px) {
        flex-direction: column;
    }
`;

const SearchLabel = styled.label`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
`;

const SearchInput = styled.input`
    min-width: 0;
    flex: 1;
    padding: 12px 14px;
    border: 1px solid rgb(81 83 89);
    border-radius: 9px;
    outline: none;
    background: rgb(38 40 44);
    color: rgb(223 225 229);

    &:focus {
        border-color: rgb(66 110 200);
        box-shadow: 0 0 0 3px rgb(66 110 200 / 25%);
    }
`;

const SearchButton = styled.button`
    padding: 12px 22px;
    border: 0;
    border-radius: 9px;
    background: rgb(53 72 131);
    color: white;
    font-weight: 700;

    &:hover:not(:disabled) {
        background: rgb(66 110 200);
    }

    &:disabled {
        cursor: wait;
        opacity: 0.65;
    }
`;

const ResultMessage = styled.div`
    margin-bottom: 22px;
`;

function SearchPage() {
    const [animeList, setAnimeList] = useState<AnimeListResponse>({data: []});
    const [searchText, setSearchText] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    async function search(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        setHasSearched(false);

        if (!searchText.trim()) {
            setError("Enter an anime title before searching.");
            return;
        }

        setIsLoading(true);
        try {
            const result = await searchAnime(searchText);
            if (!result.ok) {
                setError(result.error);
                return;
            }
            setAnimeList(result.data);
            setHasSearched(true);
        } catch {
            setError("The search could not be completed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <PageLayout
            eyebrow="Search"
            title="Find Anime"
            description="Search MyAnimeList by title, then open a result to see more details."
        >
            <SearchForm onSubmit={search}>
                <SearchLabel htmlFor="anime-search">Anime title</SearchLabel>
                <SearchInput
                    id="anime-search"
                    type="search"
                    value={searchText}
                    placeholder="Try Frieren"
                    onChange={(event) => setSearchText(event.target.value)}
                />
                <SearchButton type="submit" disabled={isLoading}>
                    {isLoading ? "Searching..." : "Search"}
                </SearchButton>
            </SearchForm>

            {error && (
                <ResultMessage>
                    <StatusMessage tone="error">{error}</StatusMessage>
                </ResultMessage>
            )}
            {hasSearched && <AnimeList list={animeList.data} />}
        </PageLayout>
    );
}

export default SearchPage;
