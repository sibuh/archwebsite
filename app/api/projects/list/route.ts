import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../lib/client'
import { Prisma } from "@prisma/client";

// const categories = [
//     "LANDSCAPE",
//     "ARCHITECTURAL",
//     "STRUCTURAL",
//     "INTERIOR"
// ] as Prisma.EnumCategoryFilter

export async function GET(request:NextRequest){
    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category") as Prisma.EnumCategoryFilter 
    const projects =await prisma.project.findMany({
        where:{
            category,
        }
    })
    return NextResponse.json(projects)
}