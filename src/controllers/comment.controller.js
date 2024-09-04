import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addComment = asyncHandler(async (req, res) => {
   const { content } = req.body;
   const videoId = req.videoId; // inserted via middleware
   const owner = req.user._id;

   if (
      [content, videoId, owner].some(
         (field) => field === undefined || field === null
      )
   ) {
      throw new ApiError(400, "All fields are required");
   }
   const comment = await Comment.create({
      content,
      owner,
      video: videoId,
   });

   if (!comment) {
      throw new ApiError(400, "Error while generation comment");
   }

   res.status(200).json(
      new ApiResponse(200, { Commented: true }, "Commented successfully")
   );
});

export { addComment };
