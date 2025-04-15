'use client';
import * as motion  from "motion/react-client";
import { useState } from "react";
import Image from "next/image";
import antractica from "../../public/images/antarctica.png"
import cribys from "../../public/images/cribys.png"
import galactic from "../../public/images/galactic.png"
import impala from "../../public/images/impala.png"
import sayulita from "../../public/images/sayulita.png"
import union from "../../public/images/union.png"



const partnerImages=[
  antractica,cribys,galactic,impala,sayulita,union
]

const InfiniteMotionSlider = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="flex gap-6"
        animate={isHovered ? { x: "0%" } : { x: ["0%", "-100%"] }}
        transition={{
          repeat: isHovered ? 0 : Infinity,
          duration: 10,
          ease: "linear",
        }}
      
      >
        {/* Duplicate elements for smooth looping */}
        {Array(2)
          .fill(partnerImages)
          .flat()
          .map((item, index) => (           

              <Image 
                src={item}
                alt="partner logo"
                width={200}
                height={150}
                key={item+index}
              />
            
          ))}
      </motion.div>
    </div>
  );
};

const Partners = () => {
    return (  
            <div className="flex flex-col items-center space-y-6">
              <h1 className="text-center text-2xl md:text-3xl font-sans font-bold">Our Partners</h1>
              <InfiniteMotionSlider />
            </div>
      );
}
 
export default Partners;
