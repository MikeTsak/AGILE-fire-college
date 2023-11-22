import Link from 'next/link';

const Navbar = () => {
    return (
        <nav>
            {/* Add your navigation links here */}
            <Link href="/"><a>Home</a></Link>
            {/* ... other links ... */}
        </nav>
    );
};

export default Navbar;
