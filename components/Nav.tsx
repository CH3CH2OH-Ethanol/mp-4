"use client";

import Link from "next/link";
import {styled} from "styled-components";

const Header = styled.header`
    padding: 24px 20px 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;

    @media screen and (max-width: 640px) {
        align-items: flex-start;
        flex-direction: column;
        gap: 14px;
    }
`;

const Brand = styled(Link)`
    color: rgb(223 225 229);
    font-size: clamp(1.45rem, 3vw, 2rem);
    font-weight: 700;
    text-decoration: none;
`;

const NavList = styled.ul`
    padding: 0;
    display: flex;
    gap: 8px;
    list-style: none;
`;

const NavLink = styled(Link)`
    padding: 9px 14px;
    border: 1px solid transparent;
    border-radius: 9px;
    display: block;
    color: rgb(223 225 229);
    text-decoration: none;

    &:hover {
        border-color: rgb(66 110 200);
        background: rgb(53 72 131);
    }
`;

function Nav() {
    return (
        <Header>
            <Brand href="/">Anime Explorer</Brand>
            <nav aria-label="Main navigation">
                <NavList>
                    <li>
                        <NavLink href="/">
                            This Season
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href="/search">
                            Find Anime
                        </NavLink>
                    </li>
                </NavList>
            </nav>
        </Header>
    );
}

export default Nav;
