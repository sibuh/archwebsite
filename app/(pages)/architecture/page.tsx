'use client';

import Image from "next/image";
import LoadingThreeDotsJumping from "@/app/components/LoadTreeDotsJamping";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";


interface Project {
  id:string,
  name:string
  description:string
  category: string
  status:string
  imagePaths:string[]
  videoPaths:string[]
  createdAt:Date
  updatedAt:Date
}

import { useState, useEffect } from 'react'
 
export default function Architecture() {
  const [data, setData] = useState<Project[]>([])
  const [isLoading, setLoading] = useState(true)
 
  useEffect(() => {
    fetch('/api/projects/list?category=ARCHITECTURAL')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])
 

  return (
        <>
          {isLoading? (<div className="mt-40">
            <LoadingThreeDotsJumping  />
            </div>) :
          <div className="grid grid-cols-1 justify-items-center space-y-6 p-10">
            
            <div>
              <p className="font-extrabold font-sans">Projects Done</p>
            </div>

            {/* <div className="flex flex-col space-y-5" > */} 
            
            <ul className="space-y-2">
          {data.map((project) => (
            <li key={project.id} className="flex justify-center space-x-5 rounded-md bg-black p-4">
              {/* Text Content */}
              <div className="font-sans w-64 h-60 rounded-md text-white">
                <h2 className="font-bold">{project.name}</h2>
                <p>{project.description}</p>
                <p>{project.status}</p>
              </div>

              {/* Image and Video Carousel */}
              <div className="w-64 h-60 rounded-md">
                <Carousel>
                  {project.imagePaths.map((path) => (
                    <div key={path} className="w-64 h-60">
                      <Image
                        className="rounded-md w-full h-full object-cover"
                        src={path}
                        alt="Project picture"
                        width={256}
                        height={240}
                      />
                    </div>
                  ))}
                  {project.videoPaths.length > 0 && (
                    <div className="w-64 h-60">
                      <video
                        className="rounded-md w-full h-full object-cover"
                        src={project.videoPaths[0]}
                        autoPlay
                        loop
                        controls
                      />
                    </div>
                  )}
                </Carousel>
              </div>
            </li>
          ))}
        </ul>

        </div>}
</>)}

 