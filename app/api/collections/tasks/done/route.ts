import { connectMongoDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";
import Collection from "@/models/collectionSchema";

connectMongoDB()

export async function PATCH(req:NextRequest ) {
    try {
        
        const reqBody = await req.json()
        const { collectionId, id } = reqBody
        console.log( reqBody)

        const collection = await Collection.findById(collectionId);

        if (!collection) {
            return NextResponse.json(
                { message: "Collection not found" },
                 { status: 404 });
        }
        const taskIndex = collection.tasks.findIndex((task:any) => task._id === id);

        if (taskIndex === -1) {
            return NextResponse.json(
                { message: "Task not found in the collection" },
                { status: 404 }
            );
        }

        // Update the task object with done: true
        collection.tasks[taskIndex].done = true;

        // Save the collection with the updated task
        await collection.save();



        return NextResponse.json({
            message: `Task done`,
            success: true,
        })
    } 
    catch (error) {
        return NextResponse.json(
            { message: "Error occured while setting done"},
             {status: 500})
         }
}