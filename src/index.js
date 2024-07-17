import connectDb from "./db/index.js";

let res = await connectDb();
// console.log(res);

/* This way we can connect to the database 
// import dotenv from "dotenv"; //not need to import process it is already available in node
import mongoose from "mongoose";
import express from "express";
import { DB_NAME } from "./constants.js";

const app = express();
// console.log(process.env.MONGODB_URI, DB_NAME);
(async () => {
   try {
      const res = await mongoose.connect(
         `${process.env.MONGODB_URI}/${DB_NAME}`
      );
        app.on("err", (error) => {
           console.log('error hai');
        });
      app.listen(process.env.PORT, () => {
         console.log("hey i am listening on 8000");
      });app.listen()
   } catch (error) {
      console.log("ERROR is ");
        throw error;
   }
})();
 */
