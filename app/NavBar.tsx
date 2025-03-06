'use client';
import Link from "next/link";
// import {FiList } from "react-icons/fi";
import Logo from "./components/logo";
import classNames from "classnames";
import { useRouter,usePathname } from "next/navigation";
import {motion} from 'framer-motion'
const NavBar = () => {
    const router =useRouter()
    const currentPath=usePathname()
    const links=[
        {
            href:"/",
            label:"Home"
        },
        {
            href:"/architecture",
            label:"Architecture"
        }, 
        {
            href:"/interior-design",
            label:"Interior Design"
        }, 
        
    ]
    return ( 
        <div className="flex border-b mt-2  px-8 h-14 items-center">
            <nav className="flex space-x-36 ">
           <Logo />
            <ul className="flex space-x-10 ">
            {links.map(link=>
                <motion.div
                key={link.href}
                whileHover={{scale:1.1}}
                >
                    <Link  
                         href={link.href} 
                        className={classNames({
                            'text-stone-800': link.href===currentPath,
                            'hover:text-red-600': link.href!==currentPath,
                            'transition-colors':true
                        })}> 
                        {link.label}
                    </Link>
                </motion.div>
            )}
            </ul>
            </nav>
            <div className="ms-8">
                <ul className="flex space-x-8 border rounded-md p-2 mr-auto">
                    <li><Link href={"/signup"}>Signup</Link></li>
                    <li><Link href={"/login"}>Login</Link> </li>
                </ul>
            </div>
        </div>
     );
}
 
export default NavBar;
