
import { connectMongoDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";
import Collection from "@/models/collectionSchema";
// Define Task interface based on the taskSchema
interface Task {
    content: string;
    expiresAt: Date;
    _id: string;
    done: boolean;
}


export async function PATCH(req: NextRequest) {
    
    try {
			await connectMongoDB()
			const reqBody = await req.json();
			const {  
					collectionName, 
					content, 
					expiresAt, 
					_id, 
					done } = reqBody;
			console.log(reqBody)

			// Find the collection 
			const collection = await Collection.findOne({ name: collectionName });
			if(collection) {
				// Check if a task with the same content already exists
				const existingTask = collection.tasks.find((task:Task )=> task.content === content);

				if (existingTask) {
						return NextResponse.json(
								{ message: "Task with the same content already exists", success: false },
								{ status: 409 } // 409 Conflict
						);
				}
				// Push reqBody object to tasks array
				collection.tasks.push({ content, expiresAt, _id, done });
				// Save the updated collection
				await collection.save();

			} 
			if (!collection) {
				// If collection not found, return 404 response
				return NextResponse.json(
					{ message: "Collection not found" },
					{ status: 404 }
				);
			}

			return NextResponse.json({
					message: `Task moved successfully`,
					success: true,
			})

    } catch (error) {
        return NextResponse.json(
            { message: "Error occurred while moving task" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
	try {
		await connectMongoDB()
		const reqBody = await req.json();
		const {  
			rmTaskId,
			rmCollectionId } = reqBody;

	const collection = await Collection.findById(rmCollectionId);

	if (!collection) {
			// If collection not found, return 404 response
			return NextResponse.json(
					{ message: "Collection not found" },
					{ status: 404 }
			);
	}
	        // Find the index of the task to be deleted within the tasks array
        const taskIndex = collection.tasks.findIndex((task:any) => task._id === rmTaskId);

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
            message: `Splendid`,
            success: true,
        });
}
 catch (error) {
	return NextResponse.json(
			{ message: "Error occurred while moving task" },
			{ status: 500 }
	);
}
}

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