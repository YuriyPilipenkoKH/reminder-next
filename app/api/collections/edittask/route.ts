
import { connectMongoDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";
import Collection from "@/models/collectionSchema";



export async function PATCH(req: NextRequest) {
    
    try {
        await connectMongoDB()
        const reqBody = await req.json();
        const { content, expiresAt, collectionId, _id } = reqBody;

        // Find the collection by ID
        const collection = await Collection.findById(collectionId);

        if (!collection) {
            // If collection not found, return 404 response
            return NextResponse.json(
                { message: "Collection not found" },
                { status: 404 }
            );
        }

        // Find the task to be edited within the tasks array
        const taskIndex = collection.tasks.findIndex((task:any) => task._id === _id);

        if (taskIndex === -1) {
            // If task not found in the collection, return 404 response
            return NextResponse.json(
                { message: "Task not found in the collection" },
                { status: 404 }
            );
        }

        // Update the content and expiresAt fields of the task using the spread operator
        collection.tasks[taskIndex] = {
            ...collection.tasks[taskIndex],
            content,
            expiresAt
        };

        // Save the updated collection
        await collection.save();

        return NextResponse.json({
            message: `Task edited successfully`,
            success: true,
        });
    } catch (error) {
        return NextResponse.json(
            { message: "Error occurred while editing task" },
            { status: 500 }
        );
    }
}