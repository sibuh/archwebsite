"use client";

import { useState,useEffect } from "react";
import Link from "next/link";
import Logo from "./components/logo";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { Menu, X,Home } from "lucide-react"; // Icons for mobile menu


const NavBar = () => {
    const currentPath = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    const links = [
        { href: "/", label: "Home", icon:<Home />},
        { href: "/architecture", label: "Architecture" },
        { href: "/interior-design", label: "Interior Design" },
    ];

    function handleLogout() {
        localStorage.removeItem("token");
        window.location.reload();
    }

    useEffect(() => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        setToken(token);
      }
    }, []);
    
   
    return (
        <div className="flex items-center justify-between border-b p-4 md:px-8 lg:px-12">
            {/* Logo */}
            <Logo />

            {/* Mobile Menu Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="md:hidden p-2 focus:outline-none"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-10">
                {links.map((link) => (
                    <motion.div key={link.href} whileHover={{ scale: 1.1 }}>
                        <Link
                            href={link.href}
                            className={classNames(
                                "transition-colors text-lg",
                                "cursor-pointer",
                                link.href === currentPath
                                    ? "text-stone-800 font-semibold"
                                    : "text-gray-600 hover:text-red-600"
                            )}
                        >
                          <span className="flex gap-1">
                            {link?.icon}
                            {link.label}
                            </span>  
                            
                        </Link>
                    </motion.div>
                ))}
            </nav>

            {/* Authentication Buttons */}
            <div className="hidden md:flex">
                {token ? (
                    <Button onPress={handleLogout} color="warning">
                        Logout
                    </Button>
                ) : (
                    <ul className="flex space-x-6 p-2">
                        <li>
                            <Link href="/signup" className="border-2 rounded-full p-2 border-yellow-500 hover:bg-yellow-950 ">
                                Signup
                            </Link>
                        </li>
                        <li>
                            <Link href="/login" className=" rounded-full border-2 border-green-700 p-2 hover:bg-green-950 ">
                                Login
                            </Link>
                        </li>
                    </ul>
                )}
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden">
                    <ul className="flex flex-col items-center space-y-4 p-4">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-lg text-gray-700 hover:text-red-600"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {token ? (
                            <Button onPress={handleLogout} color="warning">
                                Logout
                            </Button>
                        ) : (
                            <>
                                <Link
                                    href="/signup"
                                    className="text-lg text-gray-700 hover:text-red-600"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Signup
                                </Link>
                                <Link
                                    href="/login"
                                    className="text-lg text-gray-700 hover:text-red-600"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Login
                                </Link>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default NavBar;
