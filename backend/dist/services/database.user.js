import prisma from "../utils/prismaCient.js";
const findUserById = async (userId) => {
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
    });
};
const findUserByUsername = async (username) => {
    return await prisma.user.findFirst({
        where: {
            username
        },
        include: {
            profile: {
                select: {
                    profileImage: true
                }
            },
        }
    });
};
const findUserByEmail = async (email) => {
    return await prisma.user.findFirst({
        where: {
            email
        },
        include: {
            profile: {
                select: {
                    profileImage: true
                }
            }
        }
    });
};
export { findUserByEmail, findUserById, findUserByUsername };
//# sourceMappingURL=database.user.js.map