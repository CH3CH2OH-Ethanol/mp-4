import AnimeListItem from "@/types/AnimeListItem";

function AnimeCard({anime}: {anime: AnimeListItem}) {
    return (
        <p key={anime.id}>
            {anime.title}
        </p>
    )
}

export default AnimeCard;
