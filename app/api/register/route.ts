
import { connectMongoDB } from "@/lib/mongoDB";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"


export async function POST(req:NextRequest) {
    try {
        const {name, email, password} = await req.json()
        const hashedPassword = await bcrypt.hash(password, 10)
        // await connectMongoDB()

        await User.create( {name, email, password: hashedPassword})

        return NextResponse.json(
            { message: "User successfully registred"},
            { status: 201 })

    } 
    catch (error) {
        return NextResponse.json({ message: "Error occured while regestering"}, {status: 500})
        
    }
}