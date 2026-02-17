import express from "express"
import authenticationMiddleware from "../middlewares/authentication.js"
import asyncHandler from "../utils/asyncHandler.js"
import { getUserFeed, getUserFollower, getUserFollowing, getUserPost } from "../controllers/user.js"

const userRouter : express.Router = express.Router()

userRouter.get("/:userId/posts?cursor&limit", asyncHandler(getUserPost))
userRouter.get("/:userId/followers?cursor&limit", asyncHandler(getUserFollower))
userRouter.get("/:userId/following?cursor&limit", asyncHandler(getUserFollowing))
userRouter.get("/feed?cursor&limit", authenticationMiddleware, asyncHandler(getUserFeed))

export default userRouter