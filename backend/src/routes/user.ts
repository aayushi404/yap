import express from "express"
import authenticationMiddleware from "../middlewares/authentication.js"
import asyncHandler from "../utils/asyncHandler.js"
import { fetchProfile, getUserFeed, getUserFollower, getUserFollowing, getUserPost } from "../controllers/user.js"

const userRouter : express.Router = express.Router()

userRouter.get("/:userId/posts", asyncHandler(getUserPost))
userRouter.get("/:userId/followers", asyncHandler(getUserFollower))
userRouter.get("/:userId/following", asyncHandler(getUserFollowing))
userRouter.get("/feed", authenticationMiddleware, asyncHandler(getUserFeed))
userRouter.get("/profile", authenticationMiddleware, asyncHandler(fetchProfile))

export default userRouter