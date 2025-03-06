import { NextRequest,NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/app/lib/client";
import bcrypt from "bcryptjs";
 
const loginRequest=z.object(
  {
      password: z.string().min(4,'password is required').max(10),
      email: z.string().email().endsWith('@gmail.com','email is required'),
  }
)




export const config = {
    api: {
      bodyParser: false,
    },
  };
  

export async function POST(request:NextRequest){
    const body=await request.json()
    const validation=loginRequest.safeParse(body)
  if(!validation.success)
      return NextResponse.json(validation.error.format(),{status:400})

const user = await prisma.user.findUnique({
  where: {email:body.email}
});

if (!user || !(await bcrypt.compare(body.password, user.password))) {
  return NextResponse.json(new Error("Invalid credentials"),{status:403});
}

// const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });

// Store token in cookies
// cookies().set("auth", token, { httpOnly: true, path: "/", maxAge: 3600 });

return NextResponse.json({error:null,message: "Login successful", token:""},{status:200 });
     
}