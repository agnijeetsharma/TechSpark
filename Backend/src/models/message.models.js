import mongoose from 'mongoose'

const MessageSchema=new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    contentType: { type: String, enum: ["Text", "Image", "Video"], default: "Text" },
    content: { type: String, required: true }, 
    createdAt: { type: Date, default: Date.now },
})

export const Message=mongoose.model('Message',MessageSchema)
