import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema (
    {
        title: String,
        description: String,
        status: {
            type: String,
            enum: ['Pending', 'Completed', 'In Progress'], // You can define your own status options
            default: 'Pending' // Set a default status if needed
        }
    }, {
        timestamps: true
    }
);

const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);

export default Todo;