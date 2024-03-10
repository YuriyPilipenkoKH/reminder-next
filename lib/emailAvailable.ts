import "dotenv/config"
import { connectMongoDB } from "./mongoDB";
interface UserData {
    email: string;
    // Add any other properties if needed
}


export const emailAvailable = async (fieldValue: string): Promise<string | undefined> => {

    try {
        await connectMongoDB()
        const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}api/users?email=${fieldValue}`);
        const data: UserData[]  = await response.json();
        // console.log('data', data)
        const result = data.filter(u => u.email === fieldValue)
        return result.length === 0 ? undefined : 'Email already exists';
    } catch (error) {
        // Handle fetch errors here
        console.error('Error checking email availability:', error);
        throw new Error('Failed to check email availability');
    }
};