import express from "express"
import authenticationMiddleware from "../middlewares/authentication.js"
import asyncHandler from "../utils/asyncHandler.js"
import { createFollowRequest, createUnfollowRequest } from "../controllers/follow.js"
import zodValidatorMiddlware from "../middlewares/validator.js"
import { createFollowSchema } from "../schema/validator.js"

const followRouter : express.Router = express.Router()

followRouter.post("/", authenticationMiddleware, zodValidatorMiddlware(createFollowSchema),asyncHandler(createFollowRequest))
followRouter.post("/unfollow", authenticationMiddleware, zodValidatorMiddlware(createFollowSchema), asyncHandler(createUnfollowRequest))
followRouter.get("/", authenticationMiddleware)
export default followRouter