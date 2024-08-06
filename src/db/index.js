import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDb = async function () {
   try {
      const connectionInstance = await mongoose.connect(
         `${process.env.MONGODB_URI}/${DB_NAME}`
      );
      console.log("Database connected !!");
      // console.log("DB_Host is:", connectionInstance.connection.host);
   } catch (error) {
      console.log("MonogDB connection failed:", error);
      process.exitCode = 1;
   }
};
export default connectDb;
// export { connectDb as default };
