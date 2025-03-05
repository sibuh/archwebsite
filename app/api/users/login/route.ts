import { NextRequest,NextResponse } from "next/server";
import { login } from "../lib/auth";
 


export const config = {
    api: {
      bodyParser: false,
    },
  };
  

export async function POST(request:NextRequest){
    const body=await request.json()
    const response=login(body)
    return NextResponse.json(response)
}