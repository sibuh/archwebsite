"use client";

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
    <div className="overflow-hidden p-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="flex gap-6 whitespace-nowrap"
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

const AboutPage = () => {
  return (
    // Container for the entire page, centering content and adding spacing
    <div className="max-w-4xl mx-auto space-y-10 p-6">
      
      {/* About Us Section */}
      <section className="text-center">
        <h1 className="text-3xl font-mono font-bold">About Us</h1>
        <p className="mt-4 text-gray-700">
          We are a dedicated team passionate about delivering exceptional services. Our mission is to
          innovate and create meaningful experiences that drive positive change.
        </p>
      </section>

      {/* Our Partners Section with InfiniteMotionSlider */}
      <section className="text-center">
        <h1 className="text-3xl font-mono font-bold">Our Partners</h1>
        <div className="mt-4 overflow-hidden rounded-md  p-6">
          {/* This component continuously scrolls through partner logos/items */}
          <InfiniteMotionSlider />
        </div>
      </section>

      {/* People & Careers Section */}
      <section className="text-center">
        <h1 className="text-3xl font-mono font-bold">People & Careers</h1>
        <p className="mt-4 text-gray-700">
          Join our dynamic team and be part of a culture that values innovation, collaboration,
          and growth. Explore career opportunities and shape your future with us.
        </p>
      </section>

      {/* Where We Are Section */}
      <section className="text-center">
        <h1 className="text-3xl font-mono font-bold">Where We Are</h1>
        <p className="mt-4 text-gray-700">
          Our offices are strategically located to better serve our customers worldwide. Visit
          us at any of our locations to learn more about our work and vision.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;