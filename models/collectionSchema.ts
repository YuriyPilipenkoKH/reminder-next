import { CollectionColors } from '@/lib/constants';
import mongoose from 'mongoose';

// Mongoose schema for Collection
const collectionSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 4,
        required: true,
        message: '-Mongo- Invalid name'
    },
    color: {
        type: String,
        validate: {
            validator: function(value:string) {
                return Object.keys(CollectionColors).includes(value);
            },
            message: '-Mongo- Invalid color'
        },
        required: true
    },
    userId: {
        type: String,
        min: 0,
        required: true,
        essage: '-Mongo- Invalid userId'
    },
    createdAt: {
        type: Date
        
    },
    tasks: {
        type: Array
    },
}, { timestamps: true }); 

// Mongoose model for Collection
const Collection = mongoose.models.collections || mongoose.model('collections', collectionSchema);
export default Collection

