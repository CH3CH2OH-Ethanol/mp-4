"use client";

import Image from "next/image";
import Link from "next/link";
import {styled} from "styled-components";
import type AnimeListItem from "@/types/AnimeListItem";

const CardLink = styled(Link)`
    height: 100%;
    border: 1px solid rgb(61 63 68);
    border-radius: 12px;
    display: block;
    overflow: hidden;
    background: rgb(38 40 44);
    color: rgb(223 225 229);
    text-decoration: none;
    transition: transform 150ms ease, border-color 150ms ease;

    &:hover {
        border-color: rgb(195 102 56);
        transform: translateY(-3px);
    }
`;

const Cover = styled(Image)`
    width: 100%;
    height: auto;
    aspect-ratio: 3 / 4;
    display: block;
    object-fit: cover;
`;

const MissingCover = styled.div`
    aspect-ratio: 3 / 4;
    display: grid;
    place-items: center;
    background: rgb(51 53 59);
    color: rgb(136 136 136);
`;

const Content = styled.div`
    padding: 16px;
`;

const Title = styled.h2`
    margin-bottom: 10px;
    color: rgb(223 225 229);
    font-size: 1.08rem;
    line-height: 1.3;
`;

const Metadata = styled.p`
    color: rgb(166 169 176);
    font-size: 0.9rem;
    line-height: 1.5;
`;

function formatMediaType(mediaType?: string): string {
    return mediaType ? mediaType.replaceAll("_", " ").toUpperCase() : "Anime";
}

function AnimeCard({anime}: {anime: AnimeListItem}) {
    return (
        <CardLink href={`/anime/${anime.id}`}>
            {anime.main_picture ? (
                <Cover
                    src={anime.main_picture.large ?? anime.main_picture.medium}
                    alt={`${anime.title} cover`}
                    width={300}
                    height={400}
                />
            ) : (
                <MissingCover>No image</MissingCover>
            )}
            <Content>
                <Title>{anime.title}</Title>
                <Metadata>
                    {formatMediaType(anime.media_type)}
                    {anime.num_episodes ? ` · ${anime.num_episodes} ${anime.num_episodes == 1 ? "episode" : "episodes"}` : ""}
                </Metadata>
                {anime.start_date && <Metadata>Started {anime.start_date}</Metadata>}
            </Content>
        </CardLink>
    );
}

export default AnimeCard;
