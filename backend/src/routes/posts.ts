import express from "express"
import zodValidatorMiddlware from "../middlewares/validator.js"
import { createPostSchema } from "../schema/validator.js"
import authenticationMiddleware from "../middlewares/authentication.js"
import { createPost, deletePost, updatePost, likePost, dislikePost, getPostWithComments } from "../controllers/post.js"
import asyncHandler from "../utils/asyncHandler.js"

const postRouter: express.Router = express.Router()

postRouter.get("/:postId", authenticationMiddleware, asyncHandler(getPostWithComments))
postRouter.post("/", authenticationMiddleware, zodValidatorMiddlware(createPostSchema), asyncHandler(createPost))
postRouter.patch("/:id", authenticationMiddleware, zodValidatorMiddlware(createPostSchema), asyncHandler(updatePost))
postRouter.delete("/:id", authenticationMiddleware, asyncHandler(deletePost))
postRouter.get("/like/:id", authenticationMiddleware, asyncHandler(likePost))
postRouter.delete("/dislike/:id", authenticationMiddleware, asyncHandler(dislikePost))

export default postRouter