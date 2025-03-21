import { NextRequest, NextResponse } from "next/server";

import {verifyToken}  from "../../../lib/auth";

export async function GET(req: NextRequest) {
  try{
    const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "Token missing" }, { status: 401 });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  return NextResponse.json({ user: decoded },{status:200});
  }catch(err){
    NextResponse.json({error:err},{status:400})
  }
}
