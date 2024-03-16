import { connectMongoDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import User from "@/models/user";
import jwt from "jsonwebtoken"

connectMongoDB()

export async function POST(req:NextRequest) {
    try {
        const reqBody = await req.json()
        const { email, password} = reqBody
        // console.log(reqBody)

        //user exists
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json(
                {error: "User does not exist"},
                {status: 400})
        }
        console.log(`user ${user?.name} exists`);

        //is password  correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json(
                {error: "Invalid password"}, 
                {status: 400})
        }
        console.log('Correct password ');    

        //create token data
        const tokenData = {
            id: user._id,
            name: user.name,
            email: user.email
        }        
        
        //create token
        const token = await jwt.sign(
            tokenData, 
            process.env.NEXT_PUBLIC_TOKEN_SECRET!, 
            {expiresIn: "1d"}
            )

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true, 
        })
        return response;        

    }
    catch (error:any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500})
    }
}