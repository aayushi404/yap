import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import GlobalErrorMiddleware from "./middlewares/errorHandler.js";
import upload from "./controllers/upload.js";
import postRouter from "./routes/posts.js";
import commentRouter from "./routes/comments.js";
import cors from "cors";
import followRouter from "./routes/follow.js";
import userRouter from "./routes/user.js";
//dotenv.config()
const app = express();
const upload_files = multer({ dest: "uploads" });
const corsOptions = {
    origin: ["http://localhost:3000", 'https://yap-six.vercel.app'],
    method: 'GET, POST, PUT, PATCH, DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    Credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);
app.use("/follow", followRouter);
app.use("/user", userRouter);
app.use("/uploads", express.static("uploads"));
app.post('/uploads', upload_files.array("media", 4), upload);
app.use(GlobalErrorMiddleware);
const PORT = process.env.PORT || "8000";
app.listen(PORT, () => {
    console.log(`Express Server is running on port: ${PORT}`);
});
//# sourceMappingURL=index.js.map