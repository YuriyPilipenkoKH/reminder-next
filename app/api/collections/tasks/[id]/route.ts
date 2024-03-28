import { connectMongoDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";
import Collection from "@/models/collectionSchema";



export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectMongoDB()
        const { id } = params;
        const reqBody = await req.json();
        const { collectionId } = reqBody;

        // Find the collection by ID
        const collection = await Collection.findById(collectionId);

        if (!collection) {
            // If collection not found, return 404 response
            return NextResponse.json(
                { message: "Collection not found" },
                { status: 404 }
            );
        }

        // Find the index of the task to be deleted within the tasks array
        const taskIndex = collection.tasks.findIndex((task:any) => task._id === id);

        if (taskIndex === -1) {
            // If task not found in the collection, return 404 response
            return NextResponse.json(
                { message: "Task not found in the collection" },
                { status: 404 }
            );
        }

        // Remove the task from the tasks array
        collection.tasks.splice(taskIndex, 1);

        // Save the updated collection
        await collection.save();

        return NextResponse.json({
            message: `Task deleted successfully`,
            success: true,
        });
    } catch (error) {
        return NextResponse.json(
            { message: "Error occurred while deleting task" },
            { status: 500 }
        );
    }
}