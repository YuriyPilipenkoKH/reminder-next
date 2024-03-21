import { connectMongoDB, db, } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";


connectMongoDB()

export async function GET(request:NextRequest, response:NextResponse) {
    try {
      
        const collections = await db.collection("collections")
        .find()
        .toArray();
        // Assuming you have a collections collection in your MongoDB

        return NextResponse.json({
            message: `Collections found`,
            success: true,
            collections
        });
    } 
    catch (error) {
        return NextResponse.json(
            { message: "Collections not found"},
             {status: 500})
         }
}