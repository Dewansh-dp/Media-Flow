// in this file we are receiving path of media (this is on local server) and uploading it to the cloudinary
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ApiError } from "./ApiError.js";

// Configuration of cloudinary
cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
   secure: true, // sends https links as response
});

const uploadOnCloudinary = async (localFilePath, folder = undefined) => {
   try {
      if (!localFilePath) return null;
      // upload file on cloudinary
      const response = await cloudinary.uploader.upload(localFilePath, {
         resource_type: "auto", // this is type of resource
         folder: folder,
      });
      // file has been uploaded successfully
      console.log("file is uploaded on cloudinary", response.secure_url);
      fs.unlinkSync(localFilePath);
      return response;
   } catch (error) {
      // remove locally saved temporary file as the upload operation got failed
      fs.unlinkSync(localFilePath);
      return null;
   }
};

const deleteFromCloudinary = async (publicId) => {
   try {
      if (!publicId) {
         throw new ApiError(401, "Please provide public id");
      }

      const result = await cloudinary.uploader.destroy(publicId);
      console.log("Delete file", result);

      return result;
   } catch (error) {
      throw new ApiError(
         500,
         error?.message ||
            "Something went wrong while deleting file on cloudinary"
      );
   }
};

export { uploadOnCloudinary, deleteFromCloudinary };
