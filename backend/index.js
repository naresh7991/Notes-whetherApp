import app from './src/app.js'
import dotenv from 'dotenv';
import connectDB from './src/config/database.js';
import redisClient from './src/config/redis.js';

dotenv.config({
    path:'./.env'
})

const startServer =async()=>{
    try{
        await connectDB();
        if(process.env.USE_REDIS == 'true'){
            await redisClient.connect();
        }
        app.on('error',(error)=>{
            console.log("error",error);
            throw error;
        })
        const port = process.env.PORT || 4000;
        const host = process.env.BUILD === 'prod'?'0.0.0.0':'127.0.0.1'
        app.listen(port,host,()=>{
            console.log(`server is running at: ${host}:${port}`)
        })
    }catch(err){
        console.log(err);
    }

}
startServer()