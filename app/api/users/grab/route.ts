import { connectMongoDB } from "@/lib/mongoDB";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest,  res:NextResponse) {

    try {
        await connectMongoDB()
        const usersList = await User.find()

        return NextResponse.json({
            message: `Users found`,
            success: true,
            usersList,
        });
    } 
    catch (error) {
        return NextResponse.json(
            { message: "Users not found"},
             {status: 500})
         }
}