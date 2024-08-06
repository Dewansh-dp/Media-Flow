// in this file we are receiving path of media (this is on local server) and uploading it to the cloudinary
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration of cloudinary
cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
   try {
      if (!localFilePath) return null;
      // upload file on cloudinary
      const response = await cloudinary.uploader.upload(localFilePath, {
         resource_type: "auto", // this is type of resource
      });
      // file has been uploaded successfully
      console.log("file is uploaded on cloudinary", response.url);
      fs.unlinkSync(localFilePath);
      return response;
   } catch (error) {
      // remove locally saved temporary file as the upload operation got failed
      fs.unlinkSync(localFilePath);
      return null;
   }
};

export { uploadOnCloudinary };
