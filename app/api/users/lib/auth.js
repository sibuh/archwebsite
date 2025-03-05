import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import prisma from "../../../lib/client"
import {z} from "zod"

const signupRequest=z.object({
  firstName: z.string().min(3,'firstName is required').max(30),
  lastName: z.string().min(3,'lastName is required').max(30),
  username: z.string().min(3,"username is required").max(30),
  password: z.string().min(4,'password is required').max(10),
  email: z.string().email().endsWith('@gmail.com','email is required'),
  phone: z.string()

});




const SECRET_KEY = "12345678901234567890123456789012"; // Use env variables in production

export async function signup(body) {
  const validation= signupRequest.safeParse(body)
   if (!validation.success)
        return {error:validation.error.format(),message:"Failed to signup",user:null }

   const existingUser =prisma.user.findUnique({
    where:{
      email:body.email
    }
   });
   if (existingUser) return {error: new Error("User already exists"),message:"Failed to signup",user:null };
 
   //hash password
   const hashedPassword =await bcrypt.hash(body.password,10);

   const newUser= await prisma.user.create({
    data:{ 
        first_name: body.first_name,
        last_name:body.last_name,
        username: body.username,
        password:hashedPassword,
        email:body.email,
        phone:body.phone
    }
   })

  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });

  // Store token in cookies
  // cookies().set("auth", token, { httpOnly: true, path: "/", maxAge: 3600 });

  return {
    error:null, 
    message: "Signup successful", 
    user:newUser,
    token:token };
}

const loginRequest=z.object(
    {
        password: z.string().min(4,'password is required').max(10),
        email: z.string().email().endsWith('@gmail.com','email is required'),
    }
)


export async function login(email, password) {
  const body=await request.json()
    const validation=body.safeParse(loginRequest)
    if(!validation.success)
        return NextResponse.json(validation.error.format(),{status:400})

  const user = prisma.user.findUnique({
    where: email
  });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return {error: new Error("Invalid credentials"),message:"failed to login"};
  }

  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });

  // Store token in cookies
  // cookies().set("auth", token, { httpOnly: true, path: "/", maxAge: 3600 });

  return {error:null, message: "Login successful",token: token };
}

export function logout() {
  cookies().delete("auth");
  return { message: "Logged out" };
}

export function getUser() {
  const token = cookies().get("auth")?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, SECRET_KEY);
  } catch {
    return null;
  }
}
