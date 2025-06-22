import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    
    // 1) get user details from frontend
    const { fullName, username, email, password } = req.body;
    console.log("email: ", email )
    
    // 2) validation
    
    // if(fullName === ""){
    //     throw new ApiError(400, "fullName is required")
    // }
    if(
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required.")
    }
    
    // 3) check if user already exist: username, email
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if(existedUser) {
        throw new ApiError(409, "User with email or username already exist.")
    }
    
    // 4) check for images, check for avatar
    const avatarLocalPath = req.files?.avatar[0]?.path 
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path
    
    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is needed")
    }
    
    // 5) upload them to cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if(!avatar){
        throw new ApiError(400, "Avatar is needed and is not on local")
    }
    
    // 6) create user object - create entry in db
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })
    
    // 7) remove pasword and refresh token field from response
    const createdUser = await User.findById(user._id).select(
        "-password -refToken"
    )

    // 8) check for user creation
    if(!createdUser){
        throw new ApiError(500, "User not created")
    }
    
    // 9) return res
    res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    );
    
});

export { registerUser };