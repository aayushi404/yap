import { hash, compare } from "bcrypt";
const hashPassword = async (password) => {
    const saltRound = 10;
    const hashedPassword = await hash(password, saltRound);
    return hashedPassword;
};
const comparePassword = async (hashedPassword, password) => {
    return await compare(password, hashedPassword);
};
export { hashPassword, comparePassword };
//# sourceMappingURL=bcrypt.js.map