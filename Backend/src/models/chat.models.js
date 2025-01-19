import mongoose from "mongoose";
const message = new mongoose.Schema(
  {
    sender:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      requried:true
    },
    text:{
      type:String,
      requried:true
    }
  },
  { timestamps: true },
);
const ChatSchema = new mongoose.Schema({
  participants: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ],
  messages: [message],
  createdAt: { type: Date, default: Date.now },
});
export const Chat = mongoose.model("Chat", ChatSchema);
