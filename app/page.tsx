'use client';
import Link from "next/link";
import Image from "next/image";
import BestHome from "../public/home.webp";
import Architect from "../public/architect.png";
import Interior from "../public/interior.png";
import EnterAnimation from "./components/EnterAnimation";
import { Button } from "@heroui/react";
import About from "./components/about";
import Partners from "./components/partners";
import Location from "./components/location";
import Career from "./components/carearAndPeople";
import React from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  const router=useRouter();
  const categories=[
    {
      href:"/architecture",
      bullet: <EnterAnimation />,
      label:"Architectural Design",
      description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores odio necessitatibus aspernatur, tenetur officiis accusamus voluptatibus dicta nostrum aperiam dolor corrupti, quia vero veniam! Dignissimos illo debitis eaque voluptatibus voluptatum."
    },
    {
      href:"/interior-design",
      bullet: <EnterAnimation />,
      label:"Interior Design",
      description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores odio necessitatibus aspernatur, tenetur officiis accusamus voluptatibus dicta nostrum aperiam dolor corrupti, quia vero veniam! Dignissimos illo debitis eaque voluptatibus voluptatum."
 
    },
    {
      href:"/products",
      bullet: <EnterAnimation />,
      label:"Products",
      description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores odio necessitatibus aspernatur, tenetur officiis accusamus voluptatibus dicta nostrum aperiam dolor corrupti, quia vero veniam! Dignissimos illo debitis eaque voluptatibus voluptatum."
 
    },
    {
      href:"/planning",
      bullet: <EnterAnimation />,
      label:"Planning",
      description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores odio necessitatibus aspernatur, tenetur officiis accusamus voluptatibus dicta nostrum aperiam dolor corrupti, quia vero veniam! Dignissimos illo debitis eaque voluptatibus voluptatum."
 
    },
  ]
  const testimonials=[
    {
    qoute: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut voluptatibus architecto id quam ipsum cupiditate tempore, culpa illo voluptate maiores quos sapiente vero molestias, incidunt a. Soluta modi quae quibusdam." ,
    qouter:"Nebiyu Daniel"
  },
  {
    qoute: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut voluptatibus architecto id quam ipsum cupiditate tempore, culpa illo voluptate maiores quos sapiente vero molestias, incidunt a. Soluta modi quae quibusdam." ,
    qouter:"Nebiyu Daniel"
  },
  {
    qoute: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut voluptatibus architecto id quam ipsum cupiditate tempore, culpa illo voluptate maiores quos sapiente vero molestias, incidunt a. Soluta modi quae quibusdam." ,
    qouter:"Nebiyu Daniel"
  }

]
  function handlePress(){
    router.push('/architecture')
  }
 
  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 space-y-10">
      <div className="flex flex-col md:flex-row w-11/12 h-auto rounded-2xl md:rounded-3xl overflow-hidden">
        <div className="bg-white flex flex-col space-y-6 items-center w-1/2">
          <h1 className="text-center text-2xl font-sans pt-2 font-bold">Design Your Dream Projects</h1>
          <h2 className="text-left font-semibold p-4 ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi cum deserunt, 
            doloremque quibusdam quos perspiciatis molestias 
            ullam eius officiis! Aspernatur quod fugiat nostrum consequatur. 
            Quo odio ullam dolore natus labore!
          </h2>
          <Button color="primary" onPress={handlePress} className="font-bold font-sans pb-1">See Projects We Have Done</Button>
        </div>
        <div className="flex flex-col bg-white">
          <Image src={BestHome} alt="Home design" />
        </div>
      </div>

      <div className="flex flex-col p-4 space-y-4 justify-center rounded-2xl w-11/12 bg-gray-50 shadow-2xl ">
          <h2 className="text-center font-bold text-2xl md:text-3xl">What we do!</h2>
          <ul className="flex flex-wrap gap-3 justify-center space-x-auto">
            {categories.map((category)=>{
              return <div  key={category.href} 
              className="flex flex-col  space-x-2 w-60  items-center  bg-white rounded-md">
              <Link href="/interior-design" className="font-bold text-green-700 pt-1 items-center">
                {category.label}
              </Link>
              <p className="text-start p-1">{category.description}</p>
            </div>
            })} 
          </ul>
      </div>
      <div className="w-11/12 h-auto bg-white">
        <h2 className="text-center font-bold text-2xl md:text-3xl m-4">Testimonials</h2>
        <ul className="flex flex-wrap gap-3 space-x-5 p-5">
          {
            testimonials.map((testimoy,index)=>{
              return <div key={"testimony "+index} className="flex flex-col space-y-3 items-center">
                <p className="text-left bg-orange-300 rounded-md p-2">{testimoy.qoute}</p>
                <p className="text-center">By <strong>{testimoy.qouter}</strong></p>
              </div>
            })
          }
        </ul>
        
      </div>
      <div className="w-11/12 bg-white h-auto">
         <Partners />
      </div>
      <div className="flex flex-row w-11/12 h-auto bg-white">
          <div className="flex flex-col"> 
            <p className="text-center font-bold text-lg">Our Values</p>
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
          <Location  />

      </div>
      
      <div className="flex w-11/12 justify-around bg-white p-3 space-x-4">
        {/* <About  />
        <Career />
        */}
        <div className="flex flex-col">
          <h2>Company Info</h2>
          <ul>
            <li>About Gomor</li>
            <li>Professionals</li>
            <li>Careers</li>
          </ul>
        </div>
        
        <div className="flex flex-col">
          <h2>Social Medias</h2>
          <ul>
            <li>Instagram</li>
            <li>LinkedIn</li>
            <li>Face Book</li>
            <li>Tiktok</li>

          </ul>
        </div>
        <div className="flex flex-col">
          <h2>Location</h2>

        </div>
      </div>
    </div>
  );
}
