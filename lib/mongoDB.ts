import mongoose from "mongoose";


export const connectMongoDB =async () => {
    console.log(process.env.NEXT_PUBLIC_API_DOMAIN)
    // console.log(process.env.NEXT_PUBLIC_MONGO_URL)
    try {
        mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        })  
    
    } 
    catch (error) {
        console.log('Error connecting to mongoDB', error)
    }
}