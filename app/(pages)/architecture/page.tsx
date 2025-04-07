'use client';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import ListProjects from "@/app/components/listProjects";


import { Project } from "@/app/components/listProjects";

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
 console.log('dataaa', data);
 

  return (
        <>
         <ListProjects isLoading={isLoading} data={data} /> 
        </>)
}

 