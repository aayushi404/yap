import prisma from "../utils/prismaCient.js"

const findUserById = async (userId: number) => {
   return await prisma.user.findFirst({
    where: {
        id: userId
    },
    include: {
        profile: {
            select: {
                profileImage: true
            }
        }
    }
   })

}

const findUserByUsername = async (username: string) => {
    return await prisma.user.findFirst({
        where: {
            username
        },
        include: {
            profile: {
                select: {
                    profileImage:true
                }
            },
        }
    })
}

const findUserByEmail = async (email: string) => {
    return await prisma.user.findFirst({
        where: {
            email
        },
        include : {
            profile: {
                select: {
                    profileImage: true
                }
            }
        }
    })
}

export {findUserByEmail, findUserById, findUserByUsername}