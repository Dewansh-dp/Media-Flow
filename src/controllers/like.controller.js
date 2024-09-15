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

const getLikedVideos = asyncHandler(async (req, res) => {
   const likedVideos = await Like.aggregate([
      {
         $lookup: {
            from: "videos",
            localField: "video",
            foreignField: "_id",
            as: "video",
            pipeline: [
               {
                  $project: {
                     videoFile: 1,
                     thumbnail: 1,
                     title: 1,
                  },
               },
            ],
         },
      },
      {
         $lookup: {
            from: "users",
            localField: "likedBy",
            foreignField: "_id",
            as: "likedBy",
            pipeline: [
               {
                  $project: {
                     userName: 1,
                     avatar: 1,
                  },
               },
            ],
         },
      },
      {
         $addFields: {
            video: { $first: "$video" },
            likedBy: { $first: "$likedBy" },
         },
      },
   ]);

   res.status(200).json(
      new ApiResponse(200, likedVideos, "All liked videos fetched successfully")
   );
});
export { toggleVideoLike, getLikedVideos };
