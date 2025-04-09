'use client'
import {Spinner} from "@heroui/react";

export default function App() {
  return (
    <div className="flex flex-col justify-center items-center w-[200px] mx-auto ">
      <Spinner classNames={{label: "text-foreground ",}} label="simple" variant="simple" className="mt-10px" />
    </div>
  );
}
