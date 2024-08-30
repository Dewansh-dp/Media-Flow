import axios from "axios";
import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
   deleteFromCloudinary,
   uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { json } from "express";

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

const getVideoById = asyncHandler(async (req, res) => {
   const videoDocument = await Video.findById(req.params.id);
   const url = videoDocument.videoFile;
   const response = await axios.get(url, { responseType: "stream" });

   res.set({
      "content-type": response.headers.getContentType(),
      "content-disposition": `inline; filename:"video.mp4"`,
   });
   response.data.pipe(res);
   res.status(200);
});

const updateVideo = asyncHandler(async (req, res) => {
   const { title, description, videoId } = req.body;

   if (!videoId) {
      throw new ApiError(400, "Video id is required");
   }

   if (!title || !description) {
      throw new ApiError(400, "Title or Description is required");
   }

   const thumbnailLocalPath = req.file?.path;
   if (!thumbnailLocalPath) {
      throw new ApiError(401, "Thumbnail is missing");
   }

   // obtaining old thumbnail publicId
   const oldThumbnail = await Video.findById(videoId);
   const url = oldThumbnail.thumbnail;
   const urlArray = url.split("/");
   const filename = urlArray.pop();
   const publicId = filename.split(".")[0];
   const folderPublicId = "Youtube/Videos/" + publicId;
   console.log(folderPublicId);

   // deleting old thumbnail from cloudinary
   await deleteFromCloudinary(folderPublicId);

   const thumbnail = await uploadOnCloudinary(
      thumbnailLocalPath,
      "Youtube/Videos"
   );

   if (!thumbnail.secure_url) {
      throw new ApiError(400, "Error while uploading on cloudinary");
   }

   const video = await Video.findByIdAndUpdate(
      videoId,
      {
         thumbnail: thumbnail.secure_url,
         title,
         description,
      },
      { new: true }
   ).select("-duration -views -isPublished -owner");

   res.status(200).json(
      new ApiResponse(200, video, "Video updated successfully")
   );

   console.log("Video updated");
});

export { publishVideo, getVideoById, updateVideo };