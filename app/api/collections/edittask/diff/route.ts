
import { connectMongoDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";
import Collection from "@/models/collectionSchema";

connectMongoDB()

export async function PATCH(req:NextRequest) {
    try {
      
        const reqBody = await req.json()
        const {content, expiresAt, collectionId, _id, } = reqBody
        console.log(reqBody)

        // Find the collection by ID
        const collection = await Collection.findById(collectionId);

        if (!collection) {
            // If collection not found, return 404 responsecotent
            return NextResponse.json(
                { message: "Collection not found" },
                 { status: 404 });
        }
                // Update the task in the collection
                const result = await Collection.updateOne(
                    { _id: collectionId, 'tasks._id': _id }, // Find the collection with the given ID and containing the task with the given task ID
                    { $set: { 'tasks.$.content': content, 'tasks.$.expiresAt': expiresAt } } // Update the content and expiresAt fields of the matching task
                );
        
                if (result.matchedCount === 0) {
                    // If no document was modified, it means either collection or task was not found
                    return NextResponse.json(
                        { message: "Collection or task not found" },
                        { status: 404 }
                    );
                }
        
        return NextResponse.json({
            message: `Task edited successfully`,
            success: true,
        })
    } 
    catch (error) {
        return NextResponse.json(
            { message: "Error occured while editing task"},
             {status: 500})
         }
}

        // Update the content 
        // if (avatar instanceof File) {
        //     // Handle the avatar file properly, such as saving it to a storage system
        //     // and updating the user's avatar URL accordingly.
        //     // For example:
        //     const avatarURL = "/path/to/avatars/" + userId + ".jpg"; // Example path
        //     // Save avatar to storage (e.g., Amazon S3, local file system)
        //     // Update user's avatarURL field with the new URL
        //     user.avatarURL = avatarURL;
        // } else {
        //     // Handle the case where avatar is not a file (optional)
        // }