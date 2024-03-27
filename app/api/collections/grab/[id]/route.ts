import { connectMongoDB,  } from "@/lib/mongoDB";
import Collection from "@/models/collectionSchema";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request:NextRequest, {params}: {params: {id: string | null}}) {
    try {
        await connectMongoDB()
      
        const {id:userId} = params
        // console.log('-ID-',userId)
        const collections = await Collection.find({userId})
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