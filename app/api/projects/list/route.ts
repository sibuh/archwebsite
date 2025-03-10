import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../lib/client'

export async function GET(request:NextRequest){
    const { searchParams } = new URL(request.url);
    
    const category = searchParams.get("category");
    const projects =await prisma.project.findMany({
        where:{
            category:category==="ARCHITECURAL"?"ARCHITECTURAL":category==="LANDSCAPE"?"LANDSCAPE":category==="INTERIOR"?"INTERIOR":"STRUCTURAL"
        }
    })
    return NextResponse.json(projects)
}