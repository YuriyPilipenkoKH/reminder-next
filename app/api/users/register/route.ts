import { connectMongoDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import User from "@/models/user";
import { sendEmail } from "@/lib/mailer";

connectMongoDB()

export async function POST(req:NextRequest) {
    try {
        const reqBody = await req.json()
        const {name, email, password} = reqBody
        console.log(reqBody)

         // user exists
         const user = await User.findOne({email})
         if(user){
             return NextResponse.json(
                {error: "User already exists"},
                {status: 400})
         }
         //hash password
         const salt = await bcryptjs.genSalt(10)
         const hashedPassword = await bcryptjs.hash(password, salt)
         const newUser = new User({
             name,
             email,
             password: hashedPassword
         })
         const savedUser = await newUser.save()
         console.log(savedUser);

          //send verification email
          await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})
 
         return NextResponse.json({
             message: "User created successfully",
             success: true,
             savedUser
         })
         
    } 
    catch (error:any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500} )
    }
}