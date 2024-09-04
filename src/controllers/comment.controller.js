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
      throw new ApiError(400, "Comment not found");
   }

   res.status(200).json(
      new ApiResponse(200, { Commented: true }, "Commented successfully")
   );
});

const updateComment = asyncHandler(async (req, res) => {
   const { oldContent, content } = req.body;
   const owner = req.user._id,
      videoId = req.videoId;

   if (
      [content, oldContent, videoId, owner].some(
         (field) => field === undefined || field === null
      )
   ) {
      throw new ApiError(400, "All fields are required");
   }

   const comment = await Comment.findOneAndUpdate(
      {
         content: oldContent,
         owner,
         video: videoId,
      },
      {
         content,
      },
      { new: true }
   );

   if (!comment) {
      throw new ApiError(400, "Comment not found");
   }

   res.status(200).json(new ApiResponse(200, comment, "Comment updated"));
});

export { addComment, updateComment };
