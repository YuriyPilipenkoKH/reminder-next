
import { connectMongoDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";
import Collection from "@/models/collectionSchema";

connectMongoDB()

export async function POST(req:NextRequest) {
    try {
      
        const reqBody = await req.json()
        const {name, color, userId} = reqBody
        console.log(reqBody)

        // collection exists
        const collection = await Collection.findOne({name})
        if(collection){
            return NextResponse.json(
               {error: "Collection already exists"},
               {status: 400})
        }
        const newCollection = new Collection({
            name,
            color,
            userId,
        })
        const savedCollection  = await newCollection.save()
        console.log(savedCollection);


        return NextResponse.json({
            message: `Collection ${collection?.name} created successfully`,
            success: true,
            savedCollection
        })
    } 
    catch (error) {
        return NextResponse.json(
            { message: "Error occured while creating new"},
             {status: 500})
         }
}