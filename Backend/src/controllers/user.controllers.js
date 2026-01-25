import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
console.log(process.env.ACCESS_TOKEN_SECRET)
console.log(process.env.REFRESH_TOKEN_SECRET)

const generateAccessandRefreshTokens = async(userId)=>{
    try {
        const user=await User.findById(userId)
        

        const accessToken=user.generateAccessToken()
        const refreshToken=user.generateRefreshToken()
        
        user.refreshToken=refreshToken
        await user.save({validateBeforeSave:false})

        return {accessToken,refreshToken}
        

    }
    catch(error){
        console.error("TOKEN ERROR 👉", error)
        throw new ApiError(500,"Something went wrong while generating refresh and access token")
    }
}




const registeredUser = asyncHandler(async (req , res)=>{
    console.log("REQ.BODY =>", req.body);
    
    const { fullName,email,password,phoneNumber,role}=req.body;
    if (
        
        [fullName, email, password, phoneNumber,role].some(
            (field) => !field || field.trim() === ""
        )
    ){
        throw new ApiError(400, "All fields are required");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new ApiError(400, "Invalid email format");
    }
     const existeduser=await User.findOne({
        $or:[{email}]
    })
    if(existeduser){
        throw new ApiError(409,"This email already exists")

    }
    const user=await User.create({
        fullName,
         email,
        password,
        phoneNumber,
        role

    })
    //extra line adding to test
    const {accessToken,refreshToken}=await generateAccessandRefreshTokens(user._id)//*


    const createdUser=await User.findById(user._id).select(
        "-password -refreshtoken"
    )

    //extra
 const option={
    httpOnly:true,
    secure:true,
    sameSite:"none"
}//*

     if(!createdUser){
         throw new ApiError(400,"Something went wrong,please try again")


    }
   // return res.status(201).json(
        //new ApiResponse(200,createdUser,"User registered Successfully")
    //)

    //new return to check
    return res.status(201).cookie("accessToken",accessToken,option).cookie("refreshToken",refreshToken,option).json(
        new ApiResponse(
            201,{
                user:createdUser,
                accessToken,
                refreshToken
            },"User registered Successfully"

        )
    )



})

    const loginUser=asyncHandler(async (req,res)=>{
 const{email,password}=req.body;
 if( !email){
    throw new ApiError(400," email is required")
 }
 const user=await User.findOne({
    email

    })

    if(!user){
         throw new ApiError(404,"User doesnot exist")
 
    }
    const ispasswordvalid=await user.isPasswordCorrect(password)
     if(!ispasswordvalid){
         throw new ApiError(404,"Invalid user credentials")
     }

         const {accessToken,refreshToken}=await generateAccessandRefreshTokens(user._id)
    const loggeduser=await User.findById(user._id).
    select("-password -refreshToken")
    const option={
    httpOnly:true,
    secure:true,
    sameSite:"none"
}
return res.status(200).cookie("accessToken",accessToken,option).cookie("refreshToken",refreshToken,option).json(
    new ApiResponse(
        200,{

            user:loggeduser,
            accessToken,
            refreshToken,
        },"user logged in successfully"
    )
)




})

const logoutUser=asyncHandler(async (req,res)=>{
    await User.findByIdAndUpdate(
    req.user._id,
    {
        $set:{
            refreshToken:undefined

        }
    },{
            new : true
        }
    )

    const options={
       httpOnly:true,
    secure:true,
    sameSite:"none"
    }

    return res.status(200).clearCookie("accessToken",options).clearCookie("refreshToken",options).json(
        new ApiResponse(200,{},"User logged out")
    )
})


 const refreshAccessToken=asyncHandler(async (req,res)=>{
        const incomingRefreshToken=req.cookies.refreshToken || req.body.refreshToken
        if(!incomingRefreshToken){
             throw new ApiError(401,"unauthorised request")
        }
       try {
         const decodedToken=jwt.verify(
             incomingRefreshToken,
             process.env.REFRESH_TOKEN_SECRET
         )
         const user=User.findById(decodedToken?._id)
 
         if(!user){
              throw new ApiError(401,"Invalid refreshToken")
         }
         if(incomingRefreshToken!== user?.refreshToken){
            
               throw new ApiError(401,"Invalid refreshToken")
         }
         const options={
             httpOnly:true,
             secure:true
         }
         const{accessToken,newrefreshToken}=await generateAccessandRefreshTokens(user._id)
         return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",newrefreshToken,options).
         json(
             new ApiResponse(
                 200,{accessToken,refreshToken:newrefreshToken},
                 "Access Token refreshed"
 
                 
             )
         )
     
 
       } catch (error) {
        throw new ApiError(401,"invalid refreshToken")
        
       }
    })


    const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password")

  if (!user) {
    throw new ApiError(404, "User not found")
  }

  res.status(200).json(
    new ApiResponse(200, user, "User profile fetched successfully")
  )
})

const updateUserProfile = asyncHandler(async (req, res) => {
  const { fullName, phoneNumber,role,email } = req.body

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { fullName, phoneNumber,role,email },
    { new: true, runValidators: true }
  ).select("-password")

  if (!user) {
    throw new ApiError(404, "User not found")
  }

  res.status(200).json(
    new ApiResponse(200, user, "Profile updated successfully")
  )
})

const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params

  const user = await User.findByIdAndUpdate(
    userId,
    { isActive: false },
    { new: true }
  )

  if (!user) {
    throw new ApiError(404, "User not found")
  }

  res.status(200).json(
    new ApiResponse(200, null, "User deleted (deactivated) successfully")
  )
})






export { registeredUser,loginUser,logoutUser,refreshAccessToken,getUserProfile,updateUserProfile,deleteUser } 




    











    
