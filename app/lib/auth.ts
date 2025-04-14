import jwt,{JwtPayload} from 'jsonwebtoken' 

export interface User { 
    password: string;
    email: string;
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    role: string;
}

export  function generateToken(user:User){
  return jwt.sign(user ,process.env.SECRET_KEY as string, { expiresIn: "1h" });
}



export function verifyToken(token:string){
  return jwt.verify(token, process.env.SECRET_KEY as string) as JwtPayload
}
  
