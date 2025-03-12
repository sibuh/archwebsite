'use client';

import "react-responsive-carousel/lib/styles/carousel.min.css";


import { Project } from "@/app/components/listProjects";

import { useState, useEffect } from 'react'
import ListProjects from "@/app/components/listProjects";
 
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
     <>
     <ListProjects isLoading={isLoading} data={data} />
     </>
  )
}