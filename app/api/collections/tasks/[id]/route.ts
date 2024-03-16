import { connectMongoDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";
import Collection from "@/models/collectionSchema";

connectMongoDB()

export async function DELETE(req:NextRequest,  {params}: {params: {id: string}} ) {
    try {
        const {id} = params
        const reqBody = await req.json()
        const { collectionId } = reqBody
        console.log(id, reqBody)

        const collection = await Collection.findById(collectionId);
        if (!collection) {
            // If collection not found, return 404 responsecotent
            return NextResponse.json(
                { message: "Collection not found" },
                 { status: 404 });
        }
        // console.log(collection)
        if(collection.tasks.length === 0) {
            return NextResponse.json(
                { message: "There are no tasks in the collection" },
                 { status: 404 });
        }
        const taskIndex = collection.tasks.findIndex((task:any) => task._id === id)

        if (taskIndex !== -1) {
            // Remove the task from the tasks array using $pull operator
            await Collection.updateOne(
                { _id: collectionId },
                { $pull: { tasks: { _id: id } } }
            );
        } else {
            return NextResponse.json(
                { message: "Task not found" },
                 { status: 404 });
        }

        return NextResponse.json({
            message: `Task  deleted`,
            success: true,
        })
    } 
    catch (error) {
        return NextResponse.json(
            { message: "Error occured while deleting"},
             {status: 500})
         }
}