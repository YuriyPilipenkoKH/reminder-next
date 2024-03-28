import { connectMongoDB, db, } from "@/lib/mongoDB";
import Collection from "@/models/collectionSchema";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest, response:NextResponse) {
    
    try {
        await connectMongoDB()
        // const collections = await db.collection("collections")
        // .find()
        // .toArray();
        const collections = await Collection.find()

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