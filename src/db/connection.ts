
import mongoose from 'mongoose';


const connect = async():Promise<boolean> =>{
 try{
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await  mongoose.connect(process.env.MONGO_URI!);
    return true;
 }
 catch(e){
        console.error(e);
        return false;
 }
};

export default connect;

