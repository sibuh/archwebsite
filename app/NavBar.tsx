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
        {
            href:"/login",
            label:"Login"
        },
        {
            href:"/signup",
            label:"Signup"
        }
    ]
    return ( 
        <nav className="flex space-x-36 border-b mt-2  px-8 h-14 items-center">
            {/* <FiList onClick={()=>router.push("/sidebar")}/> */}
           <Logo />
            <ul className="flex space-x-10">
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
     );
}
 
export default NavBar;
