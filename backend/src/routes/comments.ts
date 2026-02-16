import express from "express"
import authenticationMiddleware from "../middlewares/authentication.js"

const commentRouter: express.Router = express.Router()

commentRouter.post("/:postId", authenticationMiddleware)
commentRouter.post("/:commentId", )

export default commentRouter