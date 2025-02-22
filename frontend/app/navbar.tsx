
import Link from "next/link";
const Navbar = () => {
    return (
        <div>
            <Link href="/landscape">Landscape</Link>
            <Link href="/engineering">Engineering</Link>
            <Link href="/architecture">Architecture</Link>
            <Link href="/planning">Planning</Link>
            <Link href="/products">Products</Link>
        </div>



      );
}
 
export default Navbar;