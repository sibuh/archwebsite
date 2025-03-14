"use client";

import { useState  } from "react";
import { motion } from "framer-motion";
import SideBar from "./sidebar";
import Image from "next/image";
import fav from "../favicon.ico"
import React from "react";
import classNames from "classnames";
import Link from "next/link"
import { usePathname } from "next/navigation";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
} from "@heroui/react";



export default function Nav() {
  const [isHovered, setIsHovered] = useState(false);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
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
        , {
          href:"/dashboard",
          label:"Add Project"
      }
    ]

  const handleOpen = () => {
    onOpen();
  };

  

  return (
    <div className="flex items-center">
      {/* Logo / List Icon */}
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => handleOpen()}
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

      {/* modal appears on left side */}
      {isOpen && (
        
        <Drawer isOpen={isOpen} placement='left' onOpenChange={onOpenChange}>
          <DrawerContent>
            {(onClose) => (
              <>
                <DrawerHeader className="flex flex-col gap-1">Drawer Title</DrawerHeader>
                <DrawerBody>
                  
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
                </DrawerBody>
                <DrawerFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Action
                  </Button>
                </DrawerFooter>
              </>
            )}
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}
