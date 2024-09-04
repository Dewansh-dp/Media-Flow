import mongoose from "mongoose";
import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
   const { channelId } = req.params;

   // findOneAndDelete returns deleted document or null if document not found
   const channelDocument = await Subscription.findOneAndDelete({
      $and: [{ channel: channelId }, { subscriber: req.user._id }],
   });

   if (channelDocument) {
      res.status(200).json(
         new ApiResponse(
            200,
            { Unsubscribed: true },
            "Unsubscribed successfully"
         )
      );
   } else {
      await Subscription.create({
         channel: channelId,
         subscriber: req.user._id,
      });

      res.status(200).json(
         new ApiResponse(200, { subscribed: true }, "Subscribed successfully")
      );
   }
});

const getUserChannelSubscribers = asyncHandler(async (req, res) => {
   const { channelId } = req.params;

   const subscribers = await Subscription.aggregate([
      {
         $match: {
            channel: new mongoose.Types.ObjectId(channelId),
         },
      },
      {
         $group: {
            _id: null,
            subscribers: { $push: "$$ROOT" },
         },
      },
      {
         $addFields: {
            subscribersCount: { $size: "$subscribers" },
         },
      },
      {
         $project: { _id: 0 },
      },
   ]);

   if (!subscribers.length) {
      res.status(200).json(
         new ApiResponse(
            200,
            { Subscribers: 0 },
            "Channel have zero subscribers"
         )
      );
   } else {
      res.status(200).json(
         new ApiResponse(200, subscribers, "Subscribers fetched successfully")
      );
   }
});

export { toggleSubscription, getUserChannelSubscribers };
