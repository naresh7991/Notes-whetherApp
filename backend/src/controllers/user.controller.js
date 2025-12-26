import { UserModel } from "../models/user.model.js";
import { comparePass } from "../utils/util.js";
import crypto from 'crypto';
import redisClient from '../config/redis.js'

export const registerUser = async(req,res)=>{
    try{
        const{ username,password,email} = req.body;
        if(!username || !password || !email){
            return res.status(400).json({
                message:"All field required"
            })
        }

        const existing = await UserModel.findOne({email:email.toLowerCase()})
        if(existing){
            return res.status(400).json({
                message:"user already exist!"
            })
        }
        const user = await UserModel.create({
            username,
            password,
            email:email.toLowerCase(),
        })
        res.status(201).json({
            message:"user successfully created!",
            user:{id:user._id,email:user.email,username:user.username}
        })
    }catch(err){
        res.status(500).json({
            message:"Internal server error!",
            error:err
        })
    }
}

export const signInUser = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message:"All field required"
            })
        }
        const user = await UserModel.findOne({email:email.toLowerCase()})
        if(!user){
            return res.status(404).json({
                message:"user Not found!"
            })
        }
        if(! await comparePass(password,user.password)){
            return res.status(401).json({
                    message:"password Incorrect!"
            })
        }
        if(req.cookies?.sessionId){
           redisClient.del(`sessionId:${req.cookies.sessionId}`)
        }
        const sessionId = await crypto.randomUUID();
        await redisClient.set(`sessionId:${sessionId}`,JSON.stringify({ email }),{EX:60*15})
        res.cookie('sessionId',sessionId,{
            httpOnly: true,
            secure:false,
            maxAge: 1000 * 60 * 15,
            sameSite: "lax",
        })
        return res.status(200).json({
            message: "user verified",
            user:user.username
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"Internal server error",
            error:err
        })
    }
}

export const authenicateUser = async(req,res)=>{
    try{
        const sessionId = req.cookies?.sessionId;
        if(!sessionId){
            return res.status(400).json({
                message:"session doesnt exist!"
            })
        }
        const user = await redisClient.get(`sessionId:${sessionId}`);
        if(!user){
            return res.status(400).json({
                message:"session do not exist!"
            })
        }
        res.status(200).json({
            message:"authenication successful!",
            user:JSON.parse(user),
            loggedIn:true
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"Internal server error",
            error: err
        })
    }
}

export const logoutUser = async(req,res)=>{
    try{
        const sessionId = req.cookies?.sessionId
        if(!sessionId){
            return res.status(200).json({
                message:"ogout User successfully"
            })
        }
        await redisClient.del(sessionId);
        res.clearCookie(sessionId,{
            httpOnly:true,
            secure:false,
            sameSite:'lax'
        })
        res.status(200).json({
            message:"logout User successfully"
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"Internal server error",
            error:err
        })
    }
}
