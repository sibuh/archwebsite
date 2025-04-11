import Link from "next/link";
import Image from "next/image";
import BestHome from "../public/best_home.jpg";
import Architect from "../public/architect.png";
import Interior from "../public/interior.png";
import { Button } from "@radix-ui/themes";
import EnterAnimation from "./components/EnterAnimation";

import About from "./components/about";
import Partners from "./components/partners";
import Location from "./components/location";
import Career from "./components/carearAndPeople";
import React from "react";
export default async function Home() {
  const categories=[
    {
      href:"/architecture",
      bullet: <EnterAnimation />,
      label:"Architectural Design"
    },
    {
      href:"/interior-design",
      bullet: <EnterAnimation />,
      label:"Interior Design"
    },
    {
      href:"/products",
      bullet: <EnterAnimation />,
      label:"Products"
    },
    {
      href:"/planning",
      bullet: <EnterAnimation />,
      label:"Planning"
    },
  ]
 
  return (
    <div className="flex flex-col items-center pt-4 bg-gray-100 space-y-10">
      
      <div className="bimage flex flex-col space-y-3 pt-10">
      <h1 className="text-2xl md:text-3xl font-mono font-extrabold text-center">
         Gomor Architects
      </h1>
        <p className="items-end font-bold font-mono text-2xl text-center">Architects of the day! </p>
      </div>

      <div className="flex flex-col p-4 space-y-4 justify-center rounded-2xl w-11/12 border-green-500 border-2 ">
          <h2 className="text-center font-bold text-2xl md:text-3xl">What we do!</h2>
          <ul className="flex flex-wrap gap-3 justify-center space-x-auto">
            {categories.map((category)=>{
              return <div  key={category.href} 
              className="flex flex-col  space-x-2 w-60  items-center  bg-white rounded-md shadow-lg">
              {/* {category.bullet} */}
              <Link href="/interior-design" className="font-bold text-green-700 pt-1 items-center">
                {category.label}
              </Link>
              <p className="text-start p-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores odio necessitatibus aspernatur, tenetur officiis accusamus voluptatibus dicta nostrum aperiam dolor corrupti, quia vero veniam! Dignissimos illo debitis eaque voluptatibus voluptatum.</p>
            </div>
            })}
            
            
          </ul>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6 m-6">

        <div className="grid grid-cols-2 gap-4 md:flex md:gap-6">
          <Image
            src={Architect}
            width={300}
            height={200}
            alt="architect"
            className="rounded-2xl w-full md:w-auto"
          />
          <Image
            src={Interior}
            width={300}
            height={200}
            alt="interior design"
            className="rounded-2xl w-full md:w-auto"
          />
        </div>

        <div className="text-center md:text-left">
          <p className="font-bold text-lg">Our Values</p>
          <ul className="mt-2 space-y-2">
            <li className="text-left">
              Quality
            </li>
            <li className="text-left">
              Customer First
            </li>
            <li className="text-left">
              Short Delivery
            </li>
            <li className="text-left">
              Appropriate Price
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col">
        <About  />
        <Partners />
        <Career />
        <Location  />
      </div>
    </div>
  );
}
