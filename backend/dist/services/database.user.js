import prisma from "../utils/prismaCient.js";
const findUserById = async (userId) => {
    return await prisma.user.findFirst({
        where: {
            id: userId
        }
    });
};
const findUserByUsername = async (username) => {
    return await prisma.user.findFirst({
        where: {
            username
        }
    });
};
const findUserByEmail = async (email) => {
    return await prisma.user.findFirst({
        where: {
            email
        }
    });
};
export { findUserByEmail, findUserById, findUserByUsername };
//# sourceMappingURL=database.user.js.map