import { expiryTime } from "../config/constant.js";
import redisClient from "../config/redis.js";

const getNews = async (req,res)=>{
    try{
        //add news api
        const date = new Date();
            const year = date.getUTCFullYear();
            const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based!
            const day = String(date.getUTCDate()).padStart(2, '0');
        const fullDate = `${year}-${month}-${day}`
        const url = `https://newsapi.org/v2/top-headlines?country=us&from=${fullDate}&sortBy=popularity&limit=3&apiKey=${process.env.NEW_API_KEY}`
        let redisHit;
        try{
            redisHit = await redisClient.get(url)
        }catch(error){
            console.log('redis not working')
        }
        if(redisHit){
            return res.status(200).json({
                message:"news (redis)",
                data: JSON.parse(redisHit)
            })
        }
        const news = await fetch(url)
        if(!news.ok){
            const newsData = await news.json()
            return res.status(400).json({
                message:"issue with api response",
                error:newsData
            })
        }
        const newsData = await news.json();
        try{
            await redisClient.set(url,JSON.stringify(newsData),{EX:expiryTime})
        }catch(error){
            console.log("redis not setup")
        }
        return res.status(200).json({
            message:"news",
            data: newsData
        })
    }catch(err){
        res.status(500).json({
            message:"internal server error",
            error:err
        })
    }
}

export {
    getNews
}