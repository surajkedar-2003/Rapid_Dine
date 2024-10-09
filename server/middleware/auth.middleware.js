import jwt from "jsonwebtoken";

const authMiddleWare = async (req, res, next)=>{
    const {token} = req.headers;
    if(!token){
        return res.status(401).json({success:false, message:"Unauthorized access"})
    }
    try{
        const tokenDecoded = jwt.verify (token, process.env.JWT_SECRET);
        req.body.userId = tokenDecoded.id;
    
        next();
        
    }catch(err){
        console.error(err);
        return res.status(500).json({success:false, message:"Internal server error"})
    }

}
export default authMiddleWare;

