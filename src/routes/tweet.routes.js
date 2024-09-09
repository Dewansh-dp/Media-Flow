import { Router } from "express";
import {
   createTweet,
   deleteTweet,
   getUserTweets,
   updateTweet,
} from "../controllers/tweet.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/create-tweet").post(createTweet);

router.route("/get-tweets").get(getUserTweets);

router.route("/update-tweet").patch(updateTweet);

router.route("/delete-tweet").delete(deleteTweet);

export default router;
