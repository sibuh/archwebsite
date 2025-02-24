'use client';
import Link from "next/link";
import {FiList } from "react-icons/fi";
import classNames from "classnames";
import { usePathname } from "next/navigation";
const NavBar = () => {
    const currentPath=usePathname()
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
               <Link  key={link.href} href={link.href} 
               className={classNames({
                'text-stone-800': link.href===currentPath,
                'hover:text-red-600': link.href!==currentPath,
                'transition-colors':true
               })}> 
                 {link.label}
               </Link>
            )
            }
            </ul>
        </nav>
     );
}
 
export default NavBar;
