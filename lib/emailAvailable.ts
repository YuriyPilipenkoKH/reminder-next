import dotenv from "dotenv"
import { connectMongoDB } from "./mongoDB";
import User from "@/models/UserTypes";

dotenv.config()
interface UserData {
    email: string;
}



export const emailAvailable = async (fieldValue: string): Promise<string | undefined> => {

    try {

        // const response = await User.find({email})
        const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}api/users/grab?email=${fieldValue}`);
        const data  = await response.json();
        //  console.log('data', data)

 
             const result = data?.usersList.filter((user: User) => user?.email === fieldValue)
             return result?.length === 0 ? undefined : 'Email already exists';


    } catch (error) {
        console.error('Error checking email availability:', error);
        // throw new Error('Failed to check email availability');
    }
};