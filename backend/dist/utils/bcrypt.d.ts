declare const hashPassword: (password: string) => Promise<string>;
declare const comparePassword: (hashedPassword: string, password: string) => Promise<boolean>;
export { hashPassword, comparePassword };
//# sourceMappingURL=bcrypt.d.ts.map