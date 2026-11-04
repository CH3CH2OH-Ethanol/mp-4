"use client";

import Image from "next/image";
import {styled} from "styled-components";
import type AnimeDetail from "@/types/AnimeDetail";

const Main = styled.main`
    flex: 1;
    padding: clamp(24px, 4vw, 48px);
    border-radius: 12px;
    background: rgb(25 26 28);
`;

const Backdrop = styled.section`
    display: grid;
    grid-template-columns: minmax(180px, 280px) minmax(0, 1fr);
    gap: clamp(24px, 5vw, 56px);

    @media screen and (max-width: 720px) {
        grid-template-columns: 1fr;
    }
`;

const Cover = styled(Image)`
    width: 100%;
    height: auto;
    border-radius: 12px;
    display: block;
`;

const MissingCover = styled.div`
    min-height: 360px;
    border-radius: 12px;
    display: grid;
    place-items: center;
    background: rgb(51 53 59);
    color: rgb(136 136 136);
`;

const Eyebrow = styled.p`
    margin-bottom: 8px;
    color: rgb(195 102 56);
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
`;

const Title = styled.h1`
    margin-bottom: 10px;
    font-size: clamp(2rem, 5vw, 3.5rem);
    line-height: 1.08;
`;

const AlternativeTitle = styled.p`
    margin-bottom: 22px;
    color: rgb(166 169 176);
    font-size: 1.05rem;
`;

const Facts = styled.dl`
    margin-bottom: 28px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

const Fact = styled.div`
    padding: 9px 12px;
    border-radius: 8px;
    background: rgb(51 53 59);

    dt {
        color: rgb(136 136 136);
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    dd {
        margin-top: 3px;
        color: rgb(223 225 229);
    }
`;

const Section = styled.section`
    margin-top: 28px;

    h2 {
        margin-bottom: 10px;
        color: rgb(173 118 204);
        font-size: 1.35rem;
    }

    p {
        color: rgb(196 198 204);
        line-height: 1.7;
        white-space: pre-line;
    }
`;

const Genres = styled.ul`
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    list-style: none;

    li {
        padding: 7px 10px;
        border: 1px solid rgb(66 110 200);
        border-radius: 999px;
        color: rgb(183 199 235);
        font-size: 0.9rem;
    }
`;

function displayValue(value?: string): string {
    return value ? value.replaceAll("_", " ") : "Unknown";
}

function AnimeDetailView({anime}: {anime: AnimeDetail}) {
    const alternativeTitle = anime.alternative_titles?.en ?? anime.alternative_titles?.ja;

    return (
        <Main>
            <Backdrop>
                <div>
                    {anime.main_picture ? (
                        <Cover
                            src={anime.main_picture.large ?? anime.main_picture.medium}
                            alt={`${anime.title} cover`}
                            width={400}
                            height={560}
                            priority
                        />
                    ) : (
                        <MissingCover>No image</MissingCover>
                    )}
                </div>

                <div>
                    <Eyebrow>{displayValue(anime.media_type)}</Eyebrow>
                    <Title>{anime.title}</Title>
                    {alternativeTitle && <AlternativeTitle>{alternativeTitle}</AlternativeTitle>}

                    <Facts>
                        {anime.mean !== undefined && <Fact><dt>Score</dt><dd>{anime.mean}</dd></Fact>}
                        {anime.rank !== undefined && <Fact><dt>Rank</dt><dd>#{anime.rank}</dd></Fact>}
                        {anime.num_episodes !== undefined && <Fact><dt>Episodes</dt><dd>{anime.num_episodes}</dd></Fact>}
                        <Fact><dt>Status</dt><dd>{displayValue(anime.status)}</dd></Fact>
                        {anime.start_date && <Fact><dt>Started</dt><dd>{anime.start_date}</dd></Fact>}
                        {anime.source && <Fact><dt>Source</dt><dd>{displayValue(anime.source)}</dd></Fact>}
                    </Facts>

                    {anime.genres && anime.genres.length > 0 && (
                        <Section>
                            <h2>Genres</h2>
                            <Genres>
                                {anime.genres.map((genre) => <li key={genre.id}>{genre.name}</li>)}
                            </Genres>
                        </Section>
                    )}

                    <Section>
                        <h2>Synopsis</h2>
                        <p>{anime.synopsis || "No synopsis is available for this anime."}</p>
                    </Section>
                </div>
            </Backdrop>
        </Main>
    );
}

export default AnimeDetailView;
