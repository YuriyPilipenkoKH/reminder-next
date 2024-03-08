import User from "@/models/user";

export const registerUser = async (data: { name: string; email: string; password: string }): Promise<void> => {
    try {
        // Create a new user document
        const newUser = new User(data);
        
        // Save the new user to the database
        await newUser.save();
    } catch (error) {
        throw new Error(`Error while registering user: ${error}`);
    }
};