'use client';

import classNames from "classnames";
import Link from "next/link"
import { usePathname } from "next/navigation";

const SideBar = (onClose:()=>void) => {
    const currentPath=usePathname()
    const links=[
        {
            href:"/about",
            label:"about"
        }, {
            href:"/career",
            label:"career"
        }
        , {
            href:"/people",
            label:"people"
        }
    ]
    return ( 
        <div className="min-h-screen  pb-20 font-[family-name:var(--font-geist-sans)]">
            <ul className="flex flex-col space-y-5">
                {links.map(link=>
                    <Link 
                        key={link.href}
                        href={link.href}
                        onClick={onClose}
                        className={classNames({
                        'text-stone-800': link.href===currentPath,
                        'hover:text-red-600': link.href!==currentPath,
                        'transition-colors':true
                        })}
                    >
                        {link.label}

                    </Link>
                )}
                
            </ul>
            
        </div>
     );
}
 
export default SideBar;