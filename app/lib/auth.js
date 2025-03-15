import jwt from 'jsonwebtoken' 
const SECRET_KEY='12345678901234567890123456789012'


export  function generateToken(user){
  return jwt.sign(user , SECRET_KEY, { expiresIn: "1h" });
}



export function verifyToken(token){
  return jwt.verify(token, SECRET_KEY)
}
  
