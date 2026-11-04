"use client";

import {styled} from "styled-components";
import type AnimeListItem from "@/types/AnimeListItem";
import AnimeCard from "@/components/AnimeCard";

const List = styled.ul`
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
    gap: 22px;
    list-style: none;
`;

const EmptyState = styled.p`
    padding: 28px;
    border: 1px dashed rgb(81 83 89);
    border-radius: 10px;
    color: rgb(166 169 176);
    text-align: center;
`;

function AnimeList({list}: {list: {node: AnimeListItem}[]}) {
    if (list.length === 0) {
        return <EmptyState>No anime found.</EmptyState>;
    }

    return (
        <List>
            {
                list.map(
                    (item) =>
                        <li key={item.node.id}>
                            <AnimeCard anime={item.node}  />
                        </li>
                )
            }
        </List>
    )
}

export default AnimeList;
