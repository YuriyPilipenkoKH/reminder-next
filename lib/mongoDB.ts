import mongoose from "mongoose";

let db: mongoose.Connection; // Define connection outside the function

export const connectMongoDB =async () => {

    try {
        mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL!);
        db = mongoose.connection; // Assign the connection inside the function
        db.setMaxListeners(20);
        db.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        db.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit(1);
        })  
    
    } 
    catch (error) {
        console.log('Error connecting to mongoDB', error)
    }
}

export  {db}
