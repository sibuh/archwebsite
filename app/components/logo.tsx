"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import SideBar from "./sidebar";
import Image from "next/image";
import fav from "../favicon.ico"

export default function Nav() {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center">
      {/* Logo / List Icon */}
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer"
      >
        {isHovered || isOpen ? (
          /* List Icon (☰) when hovered or sidebar is open */
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <svg width="30" height="30"  fill="none">
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        ) : (

            <motion.div>
              <Image 
              src={fav}
              alt="logo image"
              width={30}
              height={30}
              />
            </motion.div>

          )}
      </motion.div>

      {/* Sliding Sidebar (Appears Below the List Icon) */}
      {isOpen && (
        <motion.div
          ref={sidebarRef}
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute top-12 w-48 h-screen bg-white-800 text-black p-4 rounded-md shadow-lg"
        >
          <SideBar />
        </motion.div>
      )}
    </div>
  );
}
