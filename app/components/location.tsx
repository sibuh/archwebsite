'use client';
import dynamic from "next/dynamic";
const Map = dynamic(() => import("./osm"), { ssr: false });
const Location = () => {
    return (
          
              <Map />
          
      );
}
 
export default Location;