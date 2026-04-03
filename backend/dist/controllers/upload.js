import { StatusCodes } from "http-status-codes";
import { AppError } from "../utils/appError.js";
const upload = (req, res, next) => {
    const media = req.files;
    console.log(media);
    //only for development server
    if (media && Array.isArray(media)) {
        const PORT = process.env.PORT || 8000;
        return res.status(StatusCodes.CREATED).json({
            media: media.map((data) => `http://localhost:${PORT}/${data.path}`)
        });
    }
    throw new AppError("Invalid file upload", StatusCodes.BAD_REQUEST);
};
export default upload;
//# sourceMappingURL=upload.js.map