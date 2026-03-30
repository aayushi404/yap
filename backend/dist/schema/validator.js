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
const createPostSchema = z.object({
    text: z.string()
        .min(3, { message: "post should be atleast 3 characters long" })
        .max(250, { message: "post should be less than 250 characters long" }).optional(),
    media: z.array(z.string()).max(4, { message: "you can't upload more than 4 images" })
});
const createCommentSchema = z.object({
    text: z.string()
        .min(3, { message: "post should be atleast 3 characters long" })
        .max(250, { message: "post should be less than 250 characters long" }).optional(),
    media: z.array(z.string()).max(4, { message: "you can't upload more than 4 images" }),
    postId: z.number().optional(),
    commentId: z.number().optional()
});
const createFollowSchema = z.object({
    followingId: z.number()
});
export { loginSchema, signupSchema, createPostSchema, createCommentSchema, createFollowSchema };
//# sourceMappingURL=validator.js.map