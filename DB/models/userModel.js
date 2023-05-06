

import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: Number, 

    isLoggedIn: {
        type: Boolean, 
        
    }
    
}, {
    timestamps: true
});

export const userModel = model('User' , userSchema)