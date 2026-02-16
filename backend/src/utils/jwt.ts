import jwt from "jsonwebtoken"

const SECRET = process.env.JWT_SECRET

type payloadType = {
    userId: number
}
const signJwt = (payload: payloadType) => {
    if (!SECRET) {
        throw Error("Missing environment variable")
    }
    const token = jwt.sign(payload, SECRET)
    return token
}

const verifyToken = (token: string) => {
    if (!SECRET) {
        throw new Error("Missing envirinment variable")
    }
    const payload = jwt.verify(token, SECRET) as payloadType
    return payload
}

export {signJwt, verifyToken}