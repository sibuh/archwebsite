'use client';

import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";


interface Project {
  id:string,
  name:string
  description:string
  category:string
  status:string
  imagePaths:string[]
  videoPaths:string[]
  createdAt:Date
  updatedAt:Date
}

import { useState, useEffect } from 'react'
import LoadingThreeDotsJumping from "@/app/components/LoadTreeDotsJamping";
 
export default function InteriorDesign() {
  const [data, setData] = useState<Project[]>([])
  const [isLoading, setLoading] = useState(true)
 
  useEffect(() => {
    fetch('/api/projects/list?category=INTERIOR')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])
 
 
  return (
      <div className="flex justify-center">
        {
          isLoading?<div className="mt-40"> <LoadingThreeDotsJumping /></div>:<div className="grid grid-cols-1 justify-items-center space-y-6 p-10 pl-60">
          <div>
            <p className="font-extrabold font-sans">Projects Done</p>
          </div>
          <div>
              {data.map((project)=>
                <div key={project.id} className="space-x-10 inline-flex">
                    <div className="font-sans w-80 ">
                      <h2 className="font-bold">{project.name}</h2>
                      <p>{project.description}</p>
                      <p>{project.status}</p>
                    </div>
                    <div >
                      <Carousel
                        width={450}
                        dynamicHeight
                      >
                        {project.imagePaths.map((path)=>
                          <Image
                            key={path}
                            className="rounded-md"
                            src={path}
                            alt="Project picture"
                            width={200} 
                            height={300} 
                          />
                        )}
                        <video 
                          className="rounded-md"
                          width={450}
                          height={600}
                          src={project.videoPaths[0]}>
                         </video>
                      </Carousel>
                    </div>
                    
                 </div>
                )}  
          </div>
        </div>
        }
      </div>
  )
}