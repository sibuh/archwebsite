
import { link } from "fs";
import Link from "next/link";
import {FiList } from "react-icons/fi";
const NavBar = () => {
    const links=[
        {
            href:"/landscape",
            label:"Landscape"
        }, {
            href:"/engineering",
            label:"Engineering"
        }
        , {
            href:"/architecture",
            label:"Architecture"
        }, {
            href:"/planning",
            label:"Planning"
        }, {
            href:"/products",
            label:"Products"
        }
    ]
    return ( 
        <nav className="flex space-x-36 border-b mt-2 ml-2 px-8 h-14 items-center">
            <Link href="/"><FiList/></Link>
           
            <ul className="flex space-x-10">
            {links.map(link=>
               <Link  key={link.href} href={link.href} className="text-stone-800 hover:text-red-600 transition-colors"> 
                 {link.label}
               </Link>
            )
            }
            </ul>
        </nav>
     );
}
 
export default NavBar;
