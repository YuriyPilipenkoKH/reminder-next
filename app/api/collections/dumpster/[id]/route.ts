import { connectMongoDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";
import Collection from "@/models/collectionSchema";



export async function DELETE(req:NextRequest,  {params}: {params: {id: string}} ) {
    try {
        await connectMongoDB()
        const {id} = params
        const response = await Collection.findByIdAndDelete(id)
 
        return NextResponse.json({
            message: `Collection  deleted`,
            success: true,
        })
    } 
    catch (error) {
        return NextResponse.json(
            { message: "Error occured while deleting"},
             {status: 500})
         }
}