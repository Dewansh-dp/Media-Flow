import { asyncHandler } from "../utils/asyncHandler.js";
import { v2 as cloudinary } from "cloudinary";
import { Video } from "../models/video.model.js";

// this middleware fetch the video document _id from the cloudinaryPublicId
const getVideoId = asyncHandler(async (req, _, next) => {
   const { cloudinaryPublicId } = req.body;
   const { secure_url } = await cloudinary.api.resource(
      `Youtube/Videos/${cloudinaryPublicId}`,
      { resource_type: "video" }
   );
   const videoDocument = await Video.findOne({ videoFile: secure_url });
   req.videoId = videoDocument._id;
   next();
});

export { getVideoId };
