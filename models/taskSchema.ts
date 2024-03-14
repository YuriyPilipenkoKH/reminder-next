import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    collectionId: {
        type: String,
        min: 0,
        required: true
    },
    content: {
        type: String,
        minlength: 6,
        required: true
    },
    expiresAt: {
        type: Date
    }
});

// Mongoose model for Task
const Task = mongoose.models.task || mongoose.model('tasks', taskSchema);

export default Task;