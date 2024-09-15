import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Like } from "../models/like.model.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
   const { videoId } = req.params;

   if (!videoId) {
      throw new ApiError(400, "Video id is missing");
   }

   const like = await Like.findOne({ likedBy: req.user._id, video: videoId });

   if (!like) {
      const response = await Like.create({
         video: videoId,
         likedBy: req.user._id,
      });
      if (!response) {
         throw new ApiError(500, "Error while liking video");
      }

      res.status(200).json(
         new ApiResponse(200, response, "Liked successfully")
      );
   } else {
      const response = await Like.deleteOne({
         likedBy: req.user._id,
         video: videoId,
      });

      if (!response) {
         throw new ApiError(500, "Error while unliking video");
      }

      res.status(200).json(
         new ApiResponse(200, response, "Unliked successfully")
      );
   }
});

export { toggleVideoLike };
