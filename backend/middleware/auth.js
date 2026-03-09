const jwt = require('jsonwebtoken')
const authMiddleware = (req,res,next) =>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(!token){
        return res.status(401).json({error:'Unauthorized Request'})
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.userId
        next()
    }catch{
        return res.status(401).json({error: 'Unauthorized Request'})
    }
}
module.exports = authMiddleware