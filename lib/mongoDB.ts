import {connect} from "mongoose";


export const connectMongoDB =async () => {
    console.log(process.env)
    try {
        // const mongoURL = process.env.MONGO_URL
        const mongoURL = "mongodb+srv://martin:Kh724397@cluster0.pijgqaf.mongodb.net/db_reminder?retryWrites=true&w=majority&appName=Cluster0"
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