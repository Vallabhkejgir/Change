import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";   // direct incryption is not possible so e use mongoose hooks like ( pre, post )

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: { 
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    avatar: {
        type: String,  // cloudinary url
        required: true
    },
    cover: {
        type: String
    },
    watchHistory: [{
        type: Schema.Types.ObjectId,
        ref: "Video"
    }],
    refToken: {
        type: String,
        default: []
    }
}, {timestamps: true})

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign({
        id: this._id,
        username: this.username,
        email: this.email
    }, 
    process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
    });
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign({
        id: this._id
    }, 
    process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
    }); 
}

export const User = mongoose.model("User", userSchema);
