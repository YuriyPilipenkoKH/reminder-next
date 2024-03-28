
import { connectMongoDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";
import Collection from "@/models/collectionSchema";



export async function PATCH(req:NextRequest) {
    
    try {
        await connectMongoDB()
        const reqBody = await req.json()
        const {content, expiresAt, collectionId, _id, done} = reqBody
        // console.log(reqBody)

        // Find the collection by ID
        const collection = await Collection.findById(collectionId);

        if (!collection) {
            // If collection not found, return 404 responsecotent
            return NextResponse.json(
                { message: "Collection not found" },
                 { status: 404 });
        }
        // Push reqBody object to tasks array
        collection.tasks.push({ content, expiresAt, _id, done });

        // Save the updated collection
        await collection.save();
        
        return NextResponse.json({
            message: `Task added successfully`,
            success: true,
        })
    } 
    catch (error) {
        return NextResponse.json(
            { message: "Error occured while adding new task"},
             {status: 500})
         }
}