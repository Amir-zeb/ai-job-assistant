import Link from "next/link";

function Header() {
    return (
        <div className="text-2xl p-2 bg-(--primary)">
            <Link href="/">
                <span className="text-(--secondary)">Dashboard</span>
            </Link>
        </div>
    );
}

export default Header;