import * as z from "zod";
declare const loginSchema: z.ZodObject<{
    username: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodEmail>;
    password: z.ZodString;
}, z.core.$strip>;
declare const signupSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
    email: z.ZodEmail;
}, z.core.$strip>;
declare const createPostSchema: z.ZodObject<{
    text: z.ZodOptional<z.ZodString>;
    media: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
declare const createCommentSchema: z.ZodObject<{
    text: z.ZodOptional<z.ZodString>;
    media: z.ZodArray<z.ZodString>;
    postId: z.ZodOptional<z.ZodNumber>;
    commentId: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
declare const createFollowSchema: z.ZodObject<{
    followingId: z.ZodNumber;
}, z.core.$strip>;
export { loginSchema, signupSchema, createPostSchema, createCommentSchema, createFollowSchema };
export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type createPostInput = z.infer<typeof createPostSchema>;
export type createCommentInput = z.infer<typeof createCommentSchema>;
export type createFollowInput = z.infer<typeof createFollowSchema>;
//# sourceMappingURL=validator.d.ts.map