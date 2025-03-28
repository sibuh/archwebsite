"use client"

import Image from "next/image"
import LoadingThreeDotsJumping from "@/app/components/LoadTreeDotsJamping"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { useCallback, useEffect, useRef, useState } from "react"

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
  const timeout = useRef(Date.now())

  const requestAnim = useCallback(
    () =>
      requestAnimationFrame(() => {
        const now = Date.now()
        const timeoutDiff = now - timeout.current
        if (timeoutDiff > 30) return setScale(1)
        setScale(0.9)
        requestAnim()
      }),
    []
  )

  useEffect(() => {
    addEventListener("wheel", function () {
      timeout.current = Date.now()
      requestAnim()
    })
    return () => {
      removeEventListener("wheel", requestAnim)
    }
  }, [requestAnim])

  return (
    <>
      {isLoading ? (
        <div className="mt-40 flex justify-center">
          <LoadingThreeDotsJumping />
        </div>
      ) : (
        <div className="grid justify-items-center space-y-6 p-6 md:p-10">
          <h2 className="font-extrabold font-sans text-xl md:text-2xl text-center">
            Projects Done
          </h2>

          <ul
            style={{ scale: scale, transition: "all 1s ease" }}
            className="w-full h-auto max-w-5xl space-y-8 transition-transform duration-700 overflow-auto"
          >
            {data.map((project) => (
              <li
                key={project.id}
                onClick={(e) => {
                  e.currentTarget.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  })
                  e.currentTarget.style.width = "100%"
                  setOpen((prev: string[]) => {
                    const newArray = [...prev]
                    newArray.splice(prev.indexOf(project.id), 1, project.id)
                    return newArray
                  })
                }}
                style={{
                  transition: "all .3s ease-out",
                }}
                className="flex flex-shrink-0 flex-col md:flex-row items-center md:items-start gap-6 bg-white shadow-md rounded-md p-4 cursor-pointer"
              >
                {/* Text Content */}
                <div className="w-full h-auto md:w-1/2 space-y-2">
                  <h3 className="font-bold text-lg">{project.name}</h3>
                  <p className="text-sm">{project.description}</p>
                  <span className="text-sm font-semibold text-green-700">
                    {project.status}
                  </span>
                </div>

                {/* Image and Video Carousel */}
                <div className="w-full md:w-1/2">
                  <div className="flex gap-1">
                    {open.includes(project?.id) ? (
                      project.imagePaths.map((path) => (
                        <div key={path} className="w-full h-auto">
                          <Image
                            className="rounded-md w-full h-64 object-cover"
                            src={path}
                            alt="Project picture"
                            width={400}
                            height={256}
                          />
                        </div>
                      ))
                    ) : (
                      <div className="w-full h-auto">
                        <Image
                          className="rounded-md w-full h-64 object-cover"
                          src={project.imagePaths[0]}
                          alt="Project picture"
                          width={400}
                          height={256}
                        />
                      </div>
                    )}
                    {project.videoPaths.length > 0 && (
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
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default ListProjects
