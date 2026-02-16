import type { createPostInput } from "../schema/validator.js";
import prisma from "../utils/prismaCient.js";

const createsPost = async (data: {text?: string, media: string[]}, userId: number) => {
    let post : { text: string | null; media: string[]; createdAt: Date; updatedAt: Date; id: number; authorId: number; } | null = null
    if (data.text) {
        post = await prisma.post.create({
            data: {
                text: data.text,
                media: data.media,
                authorId: userId
            }
        })
    
    }else {
        post = await prisma.post.create({
            data: {
                media: data.media,
                authorId: userId
            }
        })
    }
    return post
}

export {createsPost}