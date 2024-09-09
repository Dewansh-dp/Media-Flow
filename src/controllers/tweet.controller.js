import { Tweet } from "../models/tweet.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTweet = asyncHandler(async (req, res) => {
   const { content } = req.body;
   if (!content) {
      throw new ApiError(400, "No content provided");
   }

   const tweet = await Tweet.create({
      content,
      owner: req.user._id,
   });

   res.status(200).json(new ApiResponse(200, tweet, "Tweeted successfully"));
});

const getUserTweets = asyncHandler(async (req, res) => {
   const tweets = await Tweet.find({ owner: req.user._id }).select(
      "owner content updatedAt"
   );
   if (!tweets.length) {
      throw new ApiError(400, "No tweets found");
   }

   res.status(200).json(
      new ApiResponse(200, tweets, "Fetched tweets successfully")
   );
});

const updateTweet = asyncHandler(async (req, res) => {
   const { content, oldContent } = req.body;
   if (!content || !oldContent) {
      throw new ApiError(400, "Content is missing");
   }
   const tweet = await Tweet.findOneAndUpdate(
      { owner: req.user._id, content: oldContent },
      {
         content,
      },
      { new: true }
   ).select("content updatedAt");

   res.status(200).json(
      new ApiResponse(200, tweet, "Tweet updated successfully")
   );
});

const deleteTweet = asyncHandler(async (req, res) => {
   const { content } = req.body;
   if (!content) {
      throw new ApiError(400, "Content is missing");
   }
   const deletedTweet = await Tweet.findOneAndDelete({
      owner: req.user._id,
      content,
   }).select("content");

   console.log(deletedTweet);
   res.status(200).json(
      new ApiResponse(200, deletedTweet, "Tweet deleted successfully")
   );
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
