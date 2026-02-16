import { hash } from "bcrypt";
const hashPassword = async (password) => {
    const saltRound = 10;
    const hashedPassword = await hash(password, saltRound);
    return hashedPassword;
};
export default hashPassword;
//# sourceMappingURL=passwordHash.js.map