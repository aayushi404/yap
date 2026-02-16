import { AppError } from "../utils/appError.js";
const GlobalErrorMiddleware = (error, req, res, next) => {
    if (error instanceof AppError) {
        res.status(error.statusCode).json({
            error: error.message,
            statusCode: error.statusCode
        });
        console.log(`${error.name}: ${error.stack}`);
        return;
    }
    if (error instanceof Error) {
        res.status(500).json({
            error: error.message,
            statusCode: 500
        });
        console.log(`${error.name}: ${error.stack}`);
        return;
    }
    return res.status(500).json({
        error: "Internal server error",
        statusCode: 500
    });
};
export default GlobalErrorMiddleware;
//# sourceMappingURL=errorHandler.js.map