import express from "express"
import multer from "multer"
import dotenv from "dotenv"
import authRouter from "./routes/auth.js"
import GlobalErrorMiddleware from "./middlewares/errorHandler.js"
import upload from "./controllers/upload.js"
import postRouter from "./routes/posts.js"
import commentRouter from "./routes/comments.js"
dotenv.config()
const app = express()
const upload_files = multer({dest: "uploads"})

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/post", postRouter)
app.use("/api/v1/comment", commentRouter)

app.use(express.static("uploads"))
app.post('/uploads', upload_files.array("media", 4), upload)

app.use(GlobalErrorMiddleware)
const PORT = process.env.PORT || "8000"

app.listen(PORT, () => {
    console.log(`Express Server is running on port: ${PORT}`)
})
