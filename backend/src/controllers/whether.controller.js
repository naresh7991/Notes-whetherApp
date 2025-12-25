import { expiryTime } from '../config/constant.js';
import redisClient from '../config/redis.js'
const getWhether = async(req,res)=>{
    try{
        const cordinate = {
            "lat": 28.4031478,
            "lon": 77.3105561,
            "country": "IN",
            "state": "Haryana"
        }
        let whetherApi =`https://api.openweathermap.org/data/2.5/weather?lat=${cordinate.lat}&lon=${cordinate.lon}&appid=`
        
        let redisHit;
        try{
            redisHit = await redisClient.get(whetherApi)
        }catch(error){
            console.log('redis not working')
        }
        if(redisHit){
            return res.status(200).json({
                message:"fetch whether (redis)",
                data: JSON.parse(redisHit)
            })
        }
        let completeUrl = whetherApi + process.env.WHETHER_API_KEY;
        const currentWhether = await fetch(completeUrl)
        const whetherData = await currentWhether.json()
        if(!currentWhether.ok){
            return res.status(400).json({
                messsage:"issue with whether api",
                error:whetherData
            })
        }
        try{
            await redisClient.set(whetherApi,JSON.stringify(whetherData),{ EX: expiryTime })
        }catch(error){
            console.log("redis not setup")
        }
        res.status(200).json({
            messsage:"fetch whether",
            data:whetherData
        })
    }catch(err){
        res.status(500).json({
            messsage:'internal server error',
            error:err
        })
    }
}

const getAQi = async(req,res)=>{
try{
        const cordinate = {
            "lat": 28.4031478,
            "lon": 77.3105561,
            "country": "IN",
            "state": "Haryana"
        }
        const whetherApi =`https://api.openweathermap.org/data/2.5/air_pollution?lat=${cordinate.lat}&lon=${cordinate.lon}&appid=`
        
        let redisHit;
        try{
            redisHit = await redisClient.get(whetherApi)
        }catch(error){
            console.log('redis not working')
        }
        if(redisHit){
            return res.status(200).json({
                message:"fetch whether (redis)",
                data: JSON.parse(redisHit)
            })
        }
        const completeUrl = whetherApi+process.env.WHETHER_API_KEY;
        const currentWhether = await fetch(completeUrl)
        if(!currentWhether.ok){
            return res.status(400).json({
                messsage:"issue with whether api",
                error:currentWhether
            })
        }
        const whetherData = await currentWhether.json()
        try{
            await redisClient.set(whetherApi,JSON.stringify(whetherData),{EX:expiryTime})
        }catch(error){
            console.log("redis not setup")
        }
        res.status(200).json({
            messsage:"fetch whether",
            data:whetherData
        })
    }catch(err){
        res.status(500).json({
            messsage:'internal server error',
            error:err
        })
    }
}

export {
    getWhether,
    getAQi
}