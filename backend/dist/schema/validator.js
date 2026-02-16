import * as z from "zod";
const passwordSchema = z.string()
    .min(8, { message: "Password must be atleast 8 characters long" })
    .max(40, { message: "Password must be less than 40 characters" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[!@#$%^&*()_+={}\[\]|:;"'<,>.?/-]/, { message: "Password must contain at least one special character" });
const loginSchema = z.object({
    username: z.string()
        .min(3, { message: "username must be atleast more than 3 letters" }).optional(),
    email: z.email().optional(),
    password: passwordSchema
});
const signupSchema = z.object({
    username: z.string()
        .min(3, { message: "Username must be atleast 3 characters long" }),
    password: passwordSchema,
    email: z.email(),
});
export { loginSchema, signupSchema };
//# sourceMappingURL=validator.js.map