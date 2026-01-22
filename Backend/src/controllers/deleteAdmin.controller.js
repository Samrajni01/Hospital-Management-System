import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";


export const deleteAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (!user) throw new ApiError(404, "User not found");

  
  if (user.role === "admin" && user._id.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You cannot delete another admin");
  }

  await User.findByIdAndDelete(req.params.userId);

  res.status(200).json(new ApiResponse(200, null, "User deleted successfully"));
});
