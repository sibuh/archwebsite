import { NextRequest,NextResponse } from "next/server";
import {z} from 'zod';
import bcrypt from "bcryptjs";
import prisma from "../../../lib/client"
 


export const config = {
    api: {
      bodyParser: false,
    },
  };
  

export async function POST(request:NextRequest){
    
    //generate token

}