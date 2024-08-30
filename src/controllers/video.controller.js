import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const publishVideo = asyncHandler(async (req, res) => {
   const { title, description } = req.body;

   if (
      [title, description].some(
         (field) => field?.trim() === "" || field?.trim() === undefined
      )
   ) {
      throw new ApiError(400, "All fields are required");
   }

   const thumbnailLocalPath = req.files?.thumbnail[0]?.path;
   const videoFileLocalPath = req.files?.videoFile[0]?.path;

   if (!thumbnailLocalPath || !videoFileLocalPath) {
      throw new ApiError(400, "Video and thumbnail are required");
   }

   const thumbnail = await uploadOnCloudinary(
      thumbnailLocalPath,
      "Youtube/Videos"
   );
   const videoFile = await uploadOnCloudinary(
      videoFileLocalPath,
      "Youtube/Videos"
   );

   if (!thumbnail || !videoFile) {
      throw new ApiError(400, "Video and thumbnail are required");
   }

   const videoData = await Video.create({
      title,
      description,
      videoFile: videoFile.secure_url,
      thumbnail: thumbnail.secure_url,
      duration: videoFile.duration,
      owner: req.user._id,
   });

   res.status(200).json(
      new ApiResponse(200, videoData, "Video published successfully")
   );

   console.log("Video published");
});

export { publishVideo };
