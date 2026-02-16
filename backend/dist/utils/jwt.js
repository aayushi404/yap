import jwt from "jsonwebtoken";
const SECRET = process.env.JWT_SECRET;
const signJwt = (payload) => {
    if (!SECRET) {
        throw Error("Missing environment variable");
    }
    const token = jwt.sign(payload, SECRET);
    return token;
};
const verifyToken = (token) => {
    if (!SECRET) {
        throw new Error("Missing envirinment variable");
    }
    const payload = jwt.verify(token, SECRET);
    return payload;
};
export { signJwt, verifyToken };
//# sourceMappingURL=jwt.js.map