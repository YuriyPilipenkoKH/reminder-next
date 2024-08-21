
import { connectMongoDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";
import Collection from "@/models/collectionSchema";



export async function PATCH(req: NextRequest) {
    
    try {
        await connectMongoDB()
        const reqBody = await req.json();
        const {  collectionName, content, expiresAt, _id, done } = reqBody;
        console.log(reqBody)

        // Find the collection by ID
        const collection = await Collection.findOne({ name: collectionName });
        // if(collection) console.log(collection)

        if (!collection) {
            // If collection not found, return 404 response
            return NextResponse.json(
                { message: "Collection not found" },
                { status: 404 }
            );
        }
        // Push reqBody object to tasks array
        collection.tasks.push({ content, expiresAt, _id, done });
        // Save the updated collection
        await collection.save();

        return NextResponse.json({
            message: `Task moved successfully`,
            success: true,
        })

        // Find the task to be edited within the tasks array
        // const taskIndex = collection.tasks.findIndex((task:any) => task._id === _id);

        // if (taskIndex === -1) {
        //     // If task not found in the collection, return 404 response
        //     return NextResponse.json(
        //         { message: "Task not found in the collection" },
        //         { status: 404 }
        //     );
        // }

        // Update the content and expiresAt fields of the task using the spread operator
        // collection.tasks[taskIndex] = {
        //     ...collection.tasks[taskIndex],
        //     content,
        //     expiresAt
        // };

        // Save the updated collection
        // await collection.save();


    } catch (error) {
        return NextResponse.json(
            { message: "Error occurred while moving task" },
            { status: 500 }
        );
    }
}