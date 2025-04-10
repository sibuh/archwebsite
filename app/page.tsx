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

export default async function Home() {
 
  return (
    <div className="flex flex-col items-center pt-4 bg-gray-50">
      <h1 className="text-2xl md:text-3xl font-mono font-extrabold text-center">
        Welcome to Gomor
      </h1>

      {/* Services Section */}
      <div className="flex flex-col md:flex-row items-center gap-6 mt-10">
        {/* Service List */}
        <div className="bg-slate-100 p-4 rounded-2xl w-full md:w-1/3">
          <h2 className="text-center font-bold mb-4 text-lg">What we do!</h2>
          <ul className="space-y-4">
            <div className="flex items-center space-x-2">
              <EnterAnimation />
              <Link href="/interior-design">
                <Button>Interior Design</Button>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <EnterAnimation />
              <Link href="/architecture">
                <Button>Architectural Design</Button>
              </Link>
            </div>
          </ul>
        </div>

        {/* Image */}
        <div className="w-full md:w-2/3">
          <Image
            src={BestHome}
            alt="best building image"
            className="rounded-2xl w-full h-auto object-cover"
            priority
          />
        </div>
      </div>

      {/* Our Values Section */}
      <div className="flex flex-col md:flex-row items-center gap-6 m-6">
        {/* Images */}
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

        {/* Values List */}
        <div className="text-center md:text-left">
          <p className="font-bold text-lg">Our Values</p>
          <ul className="mt-2 space-y-2">
            <li className="relative pl-5 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-3 before:h-3 before:rounded-full before:bg-green-500">
              Customer First
            </li>
            <li className="relative pl-5 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-3 before:h-3 before:rounded-full before:bg-yellow-500">
              Quality
            </li>
            <li className="relative pl-5 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-3 before:h-3 before:rounded-full before:bg-red-500">
              Short Delivery
            </li>
            <li className="relative pl-5 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-3 before:h-3 before:rounded-full before:bg-blue-500">
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
