type FeedType  = {
        likes: number,
        isLikedByMe: boolean,
        author : {
            name: string,
            username: string,
            profileImage: string | null
        },
        id: number,
        createdAt : Date,
        text: string | null,
        media: string[],
        authorId: number
    }

export type {FeedType}