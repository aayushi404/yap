import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../utils/request.js";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../utils/appError.js";
import {v2 as cloudinary} from "cloudinary"
import type { UploadStream, UploadApiResponse } from "cloudinary";
import dotenv from "dotenv"
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
    api_key: process.env.CLOUDINARY_API_KEY || "",
    api_secret: process.env.CLOUDINARY_API_SECRET || ""
})


const upload = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const media = req.files
    console.log(media)
    if (media && Array.isArray(media)){

        //only for development server
        if (process.env.NODE_ENV === "development") {
            const PORT = process.env.PORT || 8000
            return res.status(StatusCodes.CREATED).json({
                media: media.map((data) => `http://localhost:${PORT}/${data.path}`)
            })
        }

        const response = await Promise.all(media.map(async (data) => {
            const r = await cloudinary.uploader.upload(data.path)
            return r.secure_url
        }))

        /*
        const response = await Promise.all(
            media.map((data) => {
                const buffer = data.buffer;
                console.log(buffer)
                return new Promise<UploadApiResponse>((resolve, reject) => {
                    cloudinary.uploader
                        .upload_stream(
                            { resource_type: "auto" },
                            (error: Error | undefined, uploadResult: UploadApiResponse | undefined) => {
                                if (error || !uploadResult) {
                                    console.log(error)
                                    reject(new AppError("Failed to upload Image", StatusCodes.INTERNAL_SERVER_ERROR));
                                } else {
                                    resolve(uploadResult);
                                }
                            }
                        )
                        .end(buffer);
                });
            })
            
        );
        

        console.log(response)
        return res.status(StatusCodes.CREATED).json({
            media: response.map((result) => result.secure_url)
        });
        */

        console.log(response)
        return res.status(StatusCodes.OK).json({
            media: response
        })

    }
    
    throw new AppError("Invalid file upload", StatusCodes.BAD_REQUEST)
}

export default upload