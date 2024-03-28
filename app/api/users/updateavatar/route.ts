import { connectMongoDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";



export async function PATCH(req: NextRequest) {
    
    try {
        await connectMongoDB()
        const reqBody = await req.json();
        const {  userId, avatarURL } = reqBody
        // const {  userId } = params;
        console.log(avatarURL)
        console.log(userId)

        // Find user by ID
        let user = await User.findById(userId);
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }
        // Update avatar field 
        user.avatarURL = avatarURL;
                
        // Save the updated user
        await user.save();

        return NextResponse.json({
            message: `UserAvatar updated`,
            success: true,
            user
        });
    } catch (error:any) {
        return NextResponse.json(
            { message: "Error occurred while updating UserAvatar" },
            { status: 500 }
        );
    }
}