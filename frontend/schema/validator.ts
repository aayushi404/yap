import * as z from "zod"

const passwordSchema = z.string()
    .min(8, {message: "Password must be atleast 8 characters long"})
    .max(40, {message: "Password must be less than 40 characters"})
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[!@#$%^&*()_+={}\[\]|:;"'<,>.?/-]/, { message: "Password must contain at least one special character" })

const MAX_IMAGE_SIZE = 5 * 1024 * 1024
export const MAX_MEDIA_UPLOAD = 4
const ACCEPTED_MEDIA_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif"]

const mediaUploadSchema = z
  .array(z.instanceof(File))
  .max(MAX_MEDIA_UPLOAD, `Maximum ${MAX_MEDIA_UPLOAD} media allowed`)
  .refine(
    (files) => files.every((f) => f.size <= MAX_IMAGE_SIZE),
    "Each file must be <= 5MB"
  )
  .refine(
    (files) => files.every((f) => ACCEPTED_MEDIA_TYPES.includes(f.type)),
    "Invalid file type"
  )
  .optional()

const loginSchema = z.object({
    username : z.string()
    .min(3, {message: "username must be atleast more than 3 letters"}).optional(),
   // email : z.email().optional(),
    password : passwordSchema
})

const signupSchema = z.object({
    username : z.string()
    .min(3, {message: "Username must be atleast 3 characters long"}),
    password : passwordSchema,
    email: z.email(),

})

const createPostSchema = z.object({
    text: z.string()
    .min(3, {message: "post should be atleast 3 characters long"})
    .max(250, {message: "post should be less than 250 characters long"}),
    media: mediaUploadSchema
})

const createCommentSchema = z.object({
    text: z.string()
    .min(3, {message: "post should be atleast 3 characters long"})
    .max(250, {message: "post should be less than 250 characters long"}).optional(),
    media: z.array(z.string()),
    postId: z.number().optional(),
    commentId: z.number().optional()
})


export {loginSchema, signupSchema, createPostSchema, createCommentSchema}
export type LoginInput = z.infer<typeof loginSchema>
export type SignupInput = z.infer<typeof signupSchema>
export type CreatePostInput = z.infer<typeof createPostSchema>
export type createCommentInput = z.infer<typeof createCommentSchema>