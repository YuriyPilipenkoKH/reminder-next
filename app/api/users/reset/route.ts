
import { getDataFromToken } from "@/lib/getDataFromToken";
import { connectMongoDB } from "@/lib/mongoDB";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";


connectMongoDB()

export async function GET(request:NextRequest){
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId}).select("-password");
        if(!user){
            console.log('token is to remove') 
        }
        return NextResponse.json({
            mesaaage: "User found",
            data: user
        })
    } catch (error:any) {
        return NextResponse.json(
            {mesaaage: "User not found",}, 
            {status: 400}
            );
    }
}