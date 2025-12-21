import mongoose from 'mongoose';

const connectDB = async()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`\n Mongodb connect !!!
            ${connectionInstance.connection.host}`);

    }catch(err){
        console.log(`MongoDB connection fail ${err}`);
        process.exit(1)
    }
}

export default connectDB;