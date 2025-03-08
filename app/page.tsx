import Link from "next/link"
import Image from "next/image"
import BestHome from '../public/best_home.jpg'
import { Button } from "@radix-ui/themes"
 
export default function Home() {
  
 
  return (
    <div className="grid justify-center pt-2 bg-lime-200">
      <h1 className="justify-self-center font-mono font-extrabold"> Well come to Gomore </h1>
      
      <div className="flex mt-10 space-x-3 pt-2">
        <div className="bg-amber-300 pt-2">
          <h2 className="justify-self-center font-bold">What we do!</h2>
          <ul className="flex flex-col space-y-4 p-1">
            <Link href="/interior-design"><Button>Interior Design</Button></Link>
            <Link href="/architecture"><Button>Architectural Design</Button></Link>

          </ul>
        </div>

        <Image src={BestHome} alt="best building image" />
      </div>

    </div>
  )
}
