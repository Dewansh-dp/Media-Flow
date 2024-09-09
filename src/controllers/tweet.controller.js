import { Tweet } from "../models/tweet.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTweet = asyncHandler(async (req, res) => {
   const { content } = req.body;
   if (!content) {
      throw new ApiError(400, "No content provided");
   }

   const tweet =await Tweet.create({
      content,
      owner: req.user._id,
   });

   console.log(tweet);
   res.status(200).json(new ApiResponse(200, tweet, "Tweeted successfully"));
});

export { createTweet };
