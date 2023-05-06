
import { Schema , model } from "mongoose";

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    addedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    }
}, {
    timestamps: true
});

export const todoModel = model('Todo' , todoSchema)