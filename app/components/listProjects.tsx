"use client"

import Image from "next/image"
import LoadingThreeDotsJumping from "@/app/components/LoadTreeDotsJamping"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { useCallback, useEffect, useRef, useState } from "react"

// function scrollToCenter(element: HTMLElement) {
//   const elementRect = element.getBoundingClientRect();
//   const absoluteElementTop = elementRect.top + window.pageYOffset;
//   const middle = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);

//   window.scrollTo({
//     top: middle,
//     behavior: 'smooth' // optional
//   });
// }

export interface Project {
  id: string
  name: string
  description: string
  category: string
  status: string
  imagePaths: string[]
  videoPaths: string[]
  createdAt: Date
  updatedAt: Date
}

type ListProps = {
  data: Project[]
  isLoading: boolean
}

const ListProjects = ({ isLoading, data }: ListProps) => {
  const [scale, setScale] = useState(1)
  const [open, setOpen] = useState<string[]>([])
  const [active, setActive] = useState(false)
  const timeout = useRef(Date.now())

  const requestAnim = useCallback(
    () =>
      requestAnimationFrame(() => {
        const now = Date.now()
        const timeoutDiff = now - timeout.current
        if (timeoutDiff > 30) return setScale(1)
        setScale(0.85)
        requestAnim()
      }),
    []
  )

  useEffect(() => {
    addEventListener("wheel", function (e) {
      const deltaY = e.deltaY
      if (Math.abs(deltaY) > 2) {
        timeout.current = Date.now()
        setActive(false)
        requestAnim()
      }
    })
    return () => {
      removeEventListener("wheel", requestAnim)
    }
  }, [requestAnim])

  useEffect(() => {
    const element = document.getElementById(open[0])
    if (!element) return

    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    })
  }, [open])

  return (
    <div className="relative">
      {/* {active && (
        <div className="fixed inset-0 backdrop-blur-sm bg-slate-200 bg-opacity-80 z-[1]" />
      )} */}
      {isLoading ? (
        <div className="mt-40 flex justify-center">
          <LoadingThreeDotsJumping />
        </div>
      ) : (
        <div className="justify-items-center space-y-6 py-6 md:pt-10 z-[2] ">
          <h2 className="font-extrabold font-sans text-xl md:text-2xl text-center">
            Projects Done
          </h2>

          <ul
            style={{ scale: scale, transition: "all 1s ease" }}
            className="w-full h-auto space-y-8 transition-transform duration-700 z-0"
          >
            {data.map((project) => (
              <li
                key={project.id}
                id={project.id}
                onClick={() => {
                  setActive(true)
                  setOpen((prev: string[]) => {
                    const newArray = [...prev]
                    newArray.splice(prev.indexOf(project.id), 1)
                    newArray.unshift(project.id)
                    return newArray
                  })
                }}
                style={{
                  transition: "all .3s ease-out",
                  position: "relative",
                  ...(active &&
                    open[0] == project.id && {
                      boxShadow: "0 0 100px 10px rgba(150, 150, 150, 0.7)",
                      backdropFilter: "blur(12px)",
                      zIndex: 1000,
                    }),
                }}
                className="w-fit mx-auto flex flex-col md:flex-row items-center md:items-start gap-2 bg-white shadow-md rounded-md p-4 cursor-pointer overflow-auto"
              >
                {/* Text Content */}
                <div className="w-1/4 space-y-2 flex-shrink-0">
                  <h3 className="font-bold text-lg">{project.name}</h3>
                  <p className="text-sm">{project.description}</p>
                  <span className="text-sm font-semibold text-green-700">
                    {project.status}
                  </span>
                </div>

                {/* Image and Video Carousel */}
                <div className="flex gap-1 items-center">
                  {open[0] == project?.id && active ? (
                    project.imagePaths.map((path) => (
                      <div
                        key={path}
                        className="relative w-[800px] h-[500px] overflow-hidden"
                      >
                        <Image
                          className="rounded-md"
                          src={path}
                          alt="Project picture"
                          fill={true}
                          objectFit="contain"
                        />
                      </div>
                    ))
                  ) : (
                    <Image
                      className="rounded-md w-full h-64 object-cover"
                      src={project.imagePaths[0]}
                      alt="Project picture"
                      width={400}
                      height={256}
                    />
                  )}
                  {project.videoPaths.length > 0 &&
                    active &&
                    open[0] == project.id && (
                      <div className="w-full">
                        <video
                          className="rounded-md w-full h-64 object-cover"
                          src={project.videoPaths[0]}
                          autoPlay
                          loop
                          muted
                          controls
                        />
                      </div>
                    )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ListProjects
