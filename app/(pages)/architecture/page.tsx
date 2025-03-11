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
       <div className="flex flex-col justify-center mt-3">
          {isLoading?  (<div className="mt-40"><LoadingThreeDotsJumping  /></div>) :<div className="grid grid-cols-1 justify-items-center space-y-6 p-10 pl-60">
          <div>
            <p className="font-extrabold font-sans">Projects Done</p>
          </div>
          <div className="mt-4" >
              {data.map((project)=>
                <div key={project.id} className=" flex justify-center m-10 ">
                    <div className="font-sans w-80 ">
                      <h2 className="font-bold">{project.name}</h2>
                      <p>{project.description}</p>
                      <p>{project.status}</p>
                    </div>
                    <div className="w-64 h-60 rounded-b-md">
                      <Carousel>
                        {project.imagePaths.map((path) => (
                          <Image
                            key={path}
                            className="rounded-md w-full h-full object-cover"
                            src={path}
                            alt="Project picture"
                            width={256}
                            height={240} 
                          />
                        ))}
                        <video
                          className="rounded-md w-full h-full object-cover"
                          src={project.videoPaths[0]}
                          autoPlay
                          loop
                          muted
                        />
                      </Carousel>
                    </div> 
                </div>
                )}  
          </div>
        </div>}
       </div> 
          
        
      
  )
}

 