import express from "express"
import authenticationMiddleware from "../middlewares/authentication.js"
import zodValidatorMiddlware from "../middlewares/validator.js"
import { createCommentSchema } from "../schema/validator.js"
import asyncHandler from "../utils/asyncHandler.js"
import { createComment, deleteComment, updateComment, getComments, getPostComments } from "../controllers/comment.js"

const commentRouter: express.Router = express.Router()

commentRouter.post("/", authenticationMiddleware, zodValidatorMiddlware(createCommentSchema), asyncHandler(createComment))
commentRouter.patch("/:commentId", authenticationMiddleware, zodValidatorMiddlware(createCommentSchema), asyncHandler(updateComment))
commentRouter.delete("/:commentId", authenticationMiddleware, asyncHandler(deleteComment))
commentRouter.get("/:commentId", authenticationMiddleware, asyncHandler(getComments))
commentRouter.get("/post/:postId", authenticationMiddleware, asyncHandler(getPostComments))

export default commentRouter