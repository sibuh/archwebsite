"use client";

import Image from "next/image";
import LoadingThreeDotsJumping from "@/app/components/LoadTreeDotsJamping";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

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

          <ul className="w-full max-w-5xl space-y-8">
            {data.map((project) => (
              <li
                key={project.id}
                className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white shadow-md rounded-md p-4"
              >
                {/* Text Content */}
                <div className="w-full md:w-1/2 space-y-2">
                  <h3 className="font-bold text-lg">{project.name}</h3>
                  <p className="text-sm">{project.description}</p>
                  <span className="text-sm font-semibold text-green-700">
                    {project.status}
                  </span>
                </div>

                {/* Image and Video Carousel */}
                <div className="w-full md:w-1/2">
                  <Carousel showThumbs={false} dynamicHeight={false} autoPlay infiniteLoop>
                    {project.imagePaths.map((path) => (
                      <div key={path} className="w-full">
                        <Image
                          className="rounded-md w-full h-64 object-cover"
                          src={path}
                          alt="Project picture"
                          width={400}
                          height={256}
                        />
                      </div>
                    ))}
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
                  </Carousel>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ListProjects;
