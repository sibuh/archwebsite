import jwt from 'jsonwebtoken' 
const SECRET_KEY='12345678901234567890123456789012'


function generateToken(user){
  return jwt.sign({ user }, SECRET_KEY, { expiresIn: "1h" });
}



function verifyToken(token){
  return jwt.verify(token, SECRET_KEY)
};
  
export default {generateToken,verifyToken}