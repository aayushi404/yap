import { hash, compare } from "bcrypt"

const hashPassword = async (password:string) => {
    const saltRound = 10

    const hashedPassword = await hash(password, saltRound)
    return hashedPassword
}

const comparePassword = async (hashedPassword: string, password: string) => {
    return await compare(password, hashedPassword)
}

export {hashPassword, comparePassword}