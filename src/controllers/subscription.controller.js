import { Subscription } from "../models/subscription.model.js";
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

export { toggleSubscription };
