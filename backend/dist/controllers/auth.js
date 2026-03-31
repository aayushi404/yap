import prisma from "../utils/prismaCient.js";
import { StatusCodes } from "http-status-codes";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { findUserByEmail, findUserByUsername } from "../services/database.user.js";
import { AppError } from "../utils/appError.js";
import { signJwt } from "../utils/jwt.js";
const signup = async (req, res) => {
    const req_body = req.body;
    const u = await findUserByUsername(req_body.username);
    if (u) {
        throw new AppError("Username already exist", StatusCodes.CONFLICT);
    }
    const user = await findUserByEmail(req_body.email);
    if (user) {
        throw new AppError("An account already exist with this email", StatusCodes.CONFLICT);
    }
    const hashedPassword = await hashPassword(req_body.password);
    await prisma.user.create({ data: {
            username: req_body.username,
            email: req_body.email,
            password: hashedPassword,
            name: req_body.email.split("@")[0] || req_body.username
        } });
    res.status(StatusCodes.CREATED).json({
        message: "User successfully created"
    });
    return;
};
const login = async (req, res) => {
    const req_body = req.body;
    let user = null;
    if (req_body.email) {
        user = await findUserByEmail(req_body.email);
        if (!user) {
            throw new AppError("Invalid email", StatusCodes.UNAUTHORIZED);
        }
    }
    else if (req_body.username) {
        user = await findUserByUsername(req_body.username);
        if (!user) {
            throw new AppError("Invalid username", StatusCodes.UNAUTHORIZED);
        }
    }
    if (user && !(await comparePassword(user?.password, req_body.password))) {
        throw new AppError("Incorrect password", StatusCodes.UNAUTHORIZED);
    }
    const token = signJwt({ userId: user?.id });
    return res.status(StatusCodes.ACCEPTED).json({
        token: token,
        user: {
            id: user?.id,
            name: user?.name,
            username: user?.username,
            profileImage: user?.profile?.profileImage
        }
    });
};
export { signup, login };
//# sourceMappingURL=auth.js.map