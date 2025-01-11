// import mongoose from "mongoose";
// import validator from "validator";
// import { apiError } from "../utils/apiErrors.js";

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//     minLength: 4,
//     maxLength: 55,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//     trim: true,
//     validate: {
//       validator: function (email) {
//         if (!validator.isEmail(email)) {
//           throw new apiError(400, `Invalid Email address: ${email}`);
//         }
//         return true;
//       },
//       message: (props) => `Invalid Email address: ${props.value}`,
//     },
//   },
//   password: {
//     type: String,
//     required: true,
//     validate(value) {
//       if (!validator.isStrongPassword(value)) {
//         throw new Error("Enter a Strong Password: " + value);
//       }
//     },
//   },
//   age: {
//     type: Number,
//     min: 18,
//   },
//   gender: {
//     type: String,
//     enum: {
//       values: ["male", "female", "other"],
//       message: `{VALUE} is not a valid gender type`,
//     },
//   },
//   bio: { type: String, maxlength: 500 },
//   skills: { type: [String] },
//   experienceLevel: {
//     type: String,
//     enum: ["Beginner", "Intermediate", "Expert"],
//     default: "Beginner",
//   },
//   goals: { type: String },
//   location: { type: String },
//   profileImage: {
//     type: String,
//     default: "https://geographyandyou.com/images/user-profile.png",
//   },
//   githubLink: { type: String },
//   linkedinLink: { type: String },
//   createdAt: { type: Date, default: Date.now },
// });

// export const Profile = mongoose.model("Proflie", profileSchema);
