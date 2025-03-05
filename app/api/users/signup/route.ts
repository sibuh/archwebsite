import { NextRequest, NextResponse } from "next/server";
import {signup} from "../lib/auth"

export const config = {
    api: {
      bodyParser: false,
    },
  };

export async function POST(request:NextRequest){
    const body=await request.json()
   const res = await signup(body)
   if (!res.error) throw res.error 
   return NextResponse.json(res)
};