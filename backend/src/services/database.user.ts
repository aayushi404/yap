import prisma from "../utils/prismaCient.js"

const findUserById = async (userId: number) => {
   return await prisma.user.findFirst({
    where: {
        id: userId
    }
   })

}

const findUserByUsername = async (username: string) => {
    return await prisma.user.findFirst({
        where: {
            username
        }
    })
}

const findUserByEmail = async (email: string) => {
    return await prisma.user.findFirst({
        where: {
            email
        }
    })
}

export {findUserByEmail, findUserById, findUserByUsername}