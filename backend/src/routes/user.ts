import express from "express"
import authenticationMiddleware from "../middlewares/authentication.js"
import asyncHandler from "../utils/asyncHandler.js"
import { fetchProfile, getUserFeed, getUserFollower, getUserFollowing, getUserPost } from "../controllers/user.js"

const userRouter : express.Router = express.Router()

userRouter.get("/:username/posts",authenticationMiddleware,asyncHandler(getUserPost))
userRouter.get("/:username/followers", authenticationMiddleware,asyncHandler(getUserFollower))
userRouter.get("/:username/following", authenticationMiddleware,asyncHandler(getUserFollowing))
userRouter.get("/feed", authenticationMiddleware, asyncHandler(getUserFeed))
userRouter.get("/profile", authenticationMiddleware, asyncHandler(fetchProfile))

export default userRouter