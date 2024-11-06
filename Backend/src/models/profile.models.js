import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    bio: { type: String, maxlength: 500 },
    skills: [String],  // e.g., ["JavaScript", "React", "Node.js"]
    experienceLevel: { type: String, enum: ["Beginner", "Intermediate", "Expert"], default: "Beginner" },
    interests: [String], // e.g., ["Web Development", "AI"]
    goals: { type: String }, // e.g., "Looking for a project partner"
    location: { type: String },
    profileImage: { type: String },
    githubLink: { type: String },  // we can requried github link so that we could find that is valid user
    linkedinLink: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
  });

  export const Profile=mongoose.model('Proflie',profileSchema);