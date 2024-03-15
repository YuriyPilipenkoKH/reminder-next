import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    collectionId: {
        type: String,
        min: 0,
        required: true
    },
    content: {
        type: String,
        minlength: 4,
        required: true
    },
    createdAt: {
        type: Date
    },
    expiresAt: {
        type: Date
    },
    done: {
        type: Boolean
    }
});

// Mongoose model for Task
const Task = mongoose.models.task || mongoose.model('tasks', taskSchema);

export default Task;