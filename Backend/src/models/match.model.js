import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
   sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ["Pending", "Accepted", "Rejected","Follow","UnFollow",'Nothing'], default: "Nothing" },
    createdAt: { type: Date, default: Date.now }
  });
  

export const Match=mongoose.model('Match',matchSchema);