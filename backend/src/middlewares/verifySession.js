import redisClient from '../config/redis.js'
export const verifySession =async (req,res,next)=>{
    try{
    const sessionId = req.cookies?.sessionId;
    if(!sessionId){
        return res.status(404).json({
            message:"session not exist!"
        })
    }
    const sessionInReds = await redisClient.get(`sessionId:${sessionId}`);
    if(sessionInReds){
        next();
    }else{
         return res.status(404).json({
            message:"session not exist!"
        })
    }
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:'Internal server error',
            error:err
        })
    }
}