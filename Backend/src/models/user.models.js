import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 4,
    maxLength: 55,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    // validate: {
    //   validator: function (email) {
    //     if (!validator.isEmail(email)) {
    //       throw new apiError(400, `Invalid Email address: ${email}`);
    //     }
    //     return true;
    //   },
    //   message: (props) => `Invalid Email address: ${props.value}`,
    // },
  },
  password: {
    type: String,
    required: true,
    // validate(value) {
    //   if (!validator.isStrongPassword(value)) {
    //     throw new Error("Enter a Strong Password: " + value);
    //   }
    // },
  },
  age: {
    type: Number,
    min: 18,
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message: `{VALUE} is not a valid gender type`,
    },
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
  membershipType: {
    type: String,
  },
  bio: { type: String, maxlength: 500 },
  skills: { type: [String] },
  experienceLevel: {
    type: String,
    enum: ["Beginner", "Intermediate", "Expert"],
    default: "Beginner",
  },
  goals: { type: String },
  location: { type: String },
  profileImage: {
    type: String,
    
  },
  githubLink: { type: String },
  linkedinLink: { type: String },
  createdAt: { type: Date, default: Date.now },
});



// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  
  try {
    if (!this.password) {
      throw new Error("Password is missing");
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    console.error("Error hashing password:", error);
    next(error);
  }
});

// Check if password is correct
userSchema.methods.isPasswordCorrect = async function (password) {
  // console.log("Password provided:", password);
  // console.log("Stored Password Hash:", this.password);

  if (!this.password) {
    throw new Error("Stored password hash is missing");
  }

  try {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  } catch (error) {
    // console.error("Error comparing passwords:", error);
    // next(error)
    throw new Error("Error comparing passwords");
  }
};

// Generate access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// Refresh access token
userSchema.methods.refreshAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};



export const User=mongoose.model('User', userSchema);
