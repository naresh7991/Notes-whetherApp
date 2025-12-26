import mongoose, {Schema} from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema(
    {
        username:{
            type: String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            minLength:1,
            maxLength:30,
        },

        password:{
            type:String,
            required:true,
            minLength:6,
            maxLength:50
        },

        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true
        }
    },{
        timestamps:true
    }
)

userSchema.pre('save',async function(){
    if(!this.isModified("password"))return;
    this.password = await bcrypt.hash(this.password,10);
})



export const UserModel = mongoose.model("User",userSchema);