import AnimeListItem from "@/types/AnimeListItem";
import AnimeCard from "@/components/AnimeCard";

function AnimeList({list}: {list: {node: AnimeListItem}[]}) {
    return (
        <ul>
            {
                list.map(
                    item =>
                        <li key={item.node.id}>
                            <AnimeCard anime={item.node} />
                        </li>
                )
            }
        </ul>
    )
}

export default AnimeList;
