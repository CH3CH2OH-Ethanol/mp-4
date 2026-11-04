import Link from "next/link";

function Nav() {
    return (
        <nav>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/search">Find Anime</Link></li>
                <li><Link href="/season">This Season</Link></li>
            </ul>
        </nav>
    )
}

export default Nav;
