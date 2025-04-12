'use client';
import dynamic from "next/dynamic";
const Map = dynamic(() => import("./osm"), { ssr: false });
import location from "../../public/icons/location.svg"
import Image from "next/image";

const Location = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-10 p-6">
                <span className="flex gap-2 justify-center"> 
                    <Image src={location} alt="location icon"
                        width={30}
                        height={30}
                    />
                    <h1 className="text-3xl font-sans font-bold">Where We Are</h1>
                </span> 
                <div>
                    <Map />
                </div>
        </div>
      );
}
 
export default Location;