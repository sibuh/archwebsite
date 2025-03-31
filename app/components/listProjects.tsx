"use client";

import { useState } from "react";
import Image from "next/image";
import LoadingThreeDotsJumping from "./LoadTreeDotsJamping";

export interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  status: string;
  imagePaths: string[];
  videoPaths: string[];
  createdAt: Date;
  updatedAt: Date;
}

type ListProps = {
  data: Project[];
  isLoading: boolean;
};

const ListProjects = ({ isLoading, data }: ListProps) => {
  const [expandedProjects, setExpandedProjects] = useState<string[]>([]);

  const toggleProject = (projectId: string) => {
    setExpandedProjects((prev) =>
      prev.includes(projectId)
        ? prev // Keep it expanded (no collapse)
        : [...prev, projectId] // Expand new project
    );
  };

  return (
    <div className="relative w-full max-w-screen-xl mx-auto p-4">
      {isLoading ? (
        <div className="mt-40 flex justify-center">
          <LoadingThreeDotsJumping />
        </div>
      ) : (
        <div className="space-y-6 py-6 md:pt-10">
          <h2 className="font-extrabold text-2xl md:text-3xl text-center">
            Projects Done
          </h2>

          <ul className="flex flex-col items-center gap-8">
            {data.map((project) => {
              const isActive = expandedProjects.includes(project.id);

              return (
                <li
                  key={project.id}
                  className={`relative bg-white shadow-lg rounded-lg transition-all duration-500 cursor-pointer 
                    ${
                      isActive
                        ? "w-[95vw] md:w-[85vw] lg:w-[80vw] p-8"
                        : "w-[50vw] md:w-[60vw] lg:w-[50vw] p-6"
                    }`}
                  onClick={() => toggleProject(project.id)}
                >
                  <h3 className="font-bold text-xl text-center mb-4">
                    {project.name}
                  </h3>

                  {!isActive ? (
                    // Default View
                    <Image
                      className="rounded-md object-cover w-full h-52 md:h-64"
                      src={project.imagePaths[0]}
                      alt="Project Thumbnail"
                      width={700}
                      height={500}
                    />
                  ) : (
                    // Expanded View with Horizontal Scroll
                    <div
                      className="flex gap-6 overflow-x-scroll p-2 items-stretch"
                      style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                      }}
                    >
                      <style jsx>{`
                        ::-webkit-scrollbar {
                          display: none;
                        }
                      `}</style>

                      {/* First Half of Images */}
                      {project.imagePaths
                        .slice(0, Math.ceil(project.imagePaths.length / 2))
                        .map((path, index) => (
                          <div
                            key={`image-${index}`}
                            className="flex-shrink-0 w-72 md:w-96 lg:w-[600px] min-h-[400px] flex flex-col justify-between"
                          >
                            <Image
                              className="rounded-md object-cover w-full h-full"
                              src={path}
                              alt={`Project Image ${index + 1}`}
                              width={700}
                              height={500}
                            />
                          </div>
                        ))}

                      {/* Description in Between */}
                      <div className="flex-shrink-0 bg-gray-100 p-8 rounded-md min-w-[350px] md:min-w-[400px] flex flex-col justify-between min-h-[400px] text-center">
                        <p className="text-lg flex-grow">
                          {project.description}
                        </p>
                        <span className="text-md font-semibold text-green-700 mt-4">
                          {project.status}
                        </span>
                      </div>

                      {/* Second Half of Images + Videos */}
                      {project.imagePaths
                        .slice(Math.ceil(project.imagePaths.length / 2))
                        .map((path, index) => (
                          <div
                            key={`image-${index}`}
                            className="flex-shrink-0 w-72 md:w-96 lg:w-[600px] min-h-[400px] flex flex-col justify-between"
                          >
                            <Image
                              className="rounded-md object-cover w-full h-full"
                              src={path}
                              alt={`Project Image ${index + 1}`}
                              width={700}
                              height={500}
                            />
                          </div>
                        ))}
                      {project.videoPaths.map((path, index) => (
                        <div
                          key={`video-${index}`}
                          className="flex-shrink-0 w-72 md:w-96 lg:w-[600px] min-h-[400px] flex flex-col justify-between"
                        >
                          <video
                            className="rounded-md w-full h-full"
                            src={path}
                            controls
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ListProjects;
