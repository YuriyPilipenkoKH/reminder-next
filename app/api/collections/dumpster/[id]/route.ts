
import { connectMongoDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";
import Collection from "@/models/collectionSchema";

connectMongoDB()

export async function DELETE(req:NextRequest,  {params}: {params: {id: string}} ) {
    try {
        const {id} = params
        console.log(id)

        const response = await Collection.findByIdAndDelete(id)
        console.log(response)

        return NextResponse.json({
            message: `Collection  Deleted`,
            success: true,
        })
    } 
    catch (error) {
        return NextResponse.json(
            { message: "Error occured while deleting"},
             {status: 500})
         }
}