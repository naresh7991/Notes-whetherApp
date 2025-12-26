import bcrypt from 'bcrypt';
export const comparePass = async(userPass,dbPass)=>{
    const hashPass = await bcrypt.hash(userPass,10);
    if(hashPass == dbPass){
        return true;
    }
    return false;
}