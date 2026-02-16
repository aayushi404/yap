import express from "express";
import zodValidatorMiddlware from "../middlewares/validator.js";
import { loginSchema, signupSchema } from "../schema/validator.js";
import asyncHandler from "../utils/asyncHandler.js";
import { signup, login } from "../controllers/auth.js";
const authRouter = express.Router();
authRouter.post("/login", zodValidatorMiddlware(loginSchema), asyncHandler(login));
authRouter.post("/signup", zodValidatorMiddlware(signupSchema), asyncHandler(signup));
export default authRouter;
//# sourceMappingURL=auth.js.map