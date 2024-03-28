import { connectMongoDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";


export async function PATCH(req: NextRequest) {

    try {
        await connectMongoDB()
        // const reqBody = await req.json();
        const file = await req.formData()
        const avatar: File | null = file.get('avatar') as unknown as File
        const userId = file.get('userId')
        // const {  userId } = reqBody
        // const {  userId } = params;
        // const { userId, ...updateData } = reqBody;

        // console.log(reqBody)
        console.log(file)
        console.log(avatar)
        console.log(userId)

        const bytes = await avatar?.arrayBuffer();
        const buffer = Buffer.from(bytes);
        console.log(buffer)

        // console.log(formData)
        // Find user by ID
        let user = await User.findById(userId);
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }
                // Update avatar field using spread operator
                // user = {
                //     ...user.toObject(), // Convert Mongoose document to plain JavaScript object
                //     avatar: buffer
                // };
        
                // Save the updated user
                // await User.findByIdAndUpdate(userId, user);

        user.avatar = buffer;
        // Object.assign(user, updateData);
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