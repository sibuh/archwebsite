import jwt from 'jsonwebtoken' 


export  function generateToken(user){
  return jwt.sign(user ,process.env.SECRET_KEY, { expiresIn: "1h" });
}



export function verifyToken(token){
  return jwt.verify(token, process.env.SECRET_KEY)
}
  
