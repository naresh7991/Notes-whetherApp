import bcrypt from 'bcrypt';
export const comparePass = async(userPass,dbPass)=>{
    const isSamePass = await bcrypt.compare(userPass,dbPass)
    return isSamePass
}