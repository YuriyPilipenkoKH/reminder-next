import { connectMongoDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";

connectMongoDB()

export async function PATCH(req: NextRequest) {
    try {
        const reqBody = await req.json();
        // const { name, email, phone, company, location, userId } = reqBody;
        const { userId, ...updateData } = reqBody;
        console.log(reqBody)
        // Find user by ID
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }
        // console.log(user)
         // Update the content 
        // Update properties instead of reassigning the 'user' variable
        // user.name = name; 
        // user.email = email;
        // user.phone = phone;
        // user.company = company;
        // user.location = location;

        Object.assign(user, updateData);
        // Save the updated 
        await user.save();

        return NextResponse.json({
            message: `Profile updated`,
            success: true,
            user
        });
    } catch (error) {
        return NextResponse.json(
            { message: "Error occurred while updating profile" },
            { status: 500 }
        );
    }
}