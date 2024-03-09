import {connect} from "mongoose";


export const connectMongoDB =async () => {
    console.log(process.env.NEXT_PUBLIC_API_PORT)
    try {
        // const mongoURL = process.env.MONGO_URL
        const mongoURL = process.env.NEXT_PUBLIC_MONGO_URL
        if (!mongoURL) {
            throw new Error("MongoDB URL is not defined in environment variables");
        }
        await connect(mongoURL);   
        console.log('Connected to MongoDB');   
    
    } 
    catch (error) {
        console.log('Error connecting to mongoDB', error)
    }
}