import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, _, next) => {
   // res is replaced with '_' because it was not getting used
   try {
      //getting token from the cookies or from the header
      // req.header have authorization field like this "Authorization":"Bearer <token>", so we are removing the "Bearer " before the token
      const token =
         req.cookies?.accessToken ||
         req.header("Authorization")?.replace("Bearer ", "");

      if (!token) {
         throw new ApiError(401, "Unauthorized request");
      }

      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      // console.log("decodedToken", decodedToken);

      const user = await User.findById(decodedToken._id).select(
         "-password -refreshToken"
      );
      // console.log("user", user);

      if (!user) {
         throw new ApiError(401, "Invalid Access token");
      }

      req.user = user;
      next();
   } catch (error) {
      throw new ApiError(401, error?.message || "Invalid Access token");
   }
});
