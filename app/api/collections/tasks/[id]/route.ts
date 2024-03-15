import { connectMongoDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";
import Collection from "@/models/collectionSchema";

connectMongoDB()

export async function DELETE(req:NextRequest,  {params}: {params: {id: string}} ) {
    try {
        const {id} = params
        const reqBody = await req.json()
        const { collectionId} = reqBody
        const response = await Collection.find(collectionId)
        console.log(response)
 
        return NextResponse.json({
            // message: `Task  deleted`,
            success: true,
        })
    } 
    catch (error) {
        return NextResponse.json(
            { message: "Error occured while deleting"},
             {status: 500})
         }
}