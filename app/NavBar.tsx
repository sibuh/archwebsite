'use client';
import Link from "next/link";
import Logo from "./components/logo";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import {motion} from 'motion/react'
import { useEffect, useState } from "react";
const NavBar = () => {
    const [email,setEmail]=useState("");
    // const [token,setToken]=useState("");
    // const [canSeeDashboard,setCanSeeDashboard]=useState(false);
    const currentPath=usePathname()
    const links=[
        {
            href:"/",
            label:"Home",
        },
        {
            href:"/architecture",
            label:"Architecture",
        }, 
        {
            href:"/interior-design",
            label:"Interior Design",
        }, 
        
    ]
    

   useEffect(()=>{
    const token =localStorage.getItem("token");

        if(!token) return;

        fetch("/api/users/isAdmin",{
                method:'POST',
                body:token})
                .then((res)=>res.json())
                .then((data)=>{
                    setEmail(data.email)
                })

        
            

   },[])

   

   console.log("can see?",email==='abel@gmail.com')
    
    
    return ( 
        <div className="flex border-b mt-2  px-8 h-14 ">
            <nav className="flex space-x-36 ">
                <Logo />
                <ul className="flex space-x-10 place-items-center">
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
                                })}
                                > 
                                {link.label}
                            </Link>
                        </motion.div>
                    )}
                </ul>
            </nav>
            {
             (email==='abel@gmail.com')&&<div className="place-items-center m-auto">
                    <Link href={"/dashboard"}> Upload Project</Link>
                    </div>
            }
            <div className="m-auto justify-stretch">
                <ul className="flex space-x-8 border rounded-md p-2 mr-auto">
                    <li><Link href={"/signup"}>Signup</Link></li>
                    <li><Link href={"/login"}>Login</Link> </li>
                </ul>
            </div>
        </div>
     );
}
 
export default NavBar;
