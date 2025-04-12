"use client";

import { useState,useEffect  } from "react";
import { motion } from "framer-motion";
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
  const [role,setRole]=useState("");

    useEffect(()=>{
      async function getUser(){
        const token =localStorage.getItem("token");
    
        if(!token) return;
  
        const res =await fetch("/api/users/isAdmin",{
                   headers:{
                    Authorization:`Bearer ${token}`
                   }
                });
        if (res.ok) {
           const data = await res.json();
           setRole(data.user.role);
           console.log("verified user",data.user);

        } else if (res.status===400){
          localStorage.setItem("token","")
          console.log("token expired");
        }

      }
      getUser()
     },[])   

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
        className="cursor-pointer items-center"
      >
        {isHovered || isOpen ? (
          /* List Icon (☰) when hovered or sidebar is open */
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="flex"
          >
            <svg width="30" height="30"  fill="none">
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <h1 className="font-bold text-3xl items-center">Gomor Architects </h1>
          </motion.div>
        ) : (

            <motion.div className="flex space-x-1">
              <Image 
              src={fav}
              alt="logo image"
              width={30}
              height={30}
              />
              <h1 className="font-bold text-3xl items-center">Gomor Architects </h1>
            </motion.div>

          )}
      </motion.div>

      {/* modal appears on left side */}
      {isOpen && (
        
        <Drawer isOpen={isOpen} placement='left' onOpenChange={onOpenChange} size="sm" >
          <DrawerContent>
            {(onClose) => (
              <>
                <DrawerHeader className="flex flex-col gap-1">Menu</DrawerHeader>
                <DrawerBody>
                  
              <div className="min-h-svh  pb-20 font-[family-name:var(--font-geist-sans)]">
               
                    
                      {
                        (role==='ADMIN')&&
                              <Link href={"/upload"}
                                className={classNames({
                                'text-stone-800': "/upload"===currentPath,
                                'hover:text-red-600': "/upload"!==currentPath,
                                'transition-colors':true,
                                })}
                                onClick={onClose}
                               > 
                                 Upload Project
                              </Link>
                               
                       }
                    
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
