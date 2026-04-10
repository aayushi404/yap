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

type PostCommentsType = {
    comments: {
        id: number;
        text: string | null;
        media: string[];
        createdAt: Date;
        updatedAt: Date;
        authorId: number;
        postId: number | null;
        commentId: number | null;
    }[];
} & {
    id: number;
    text: string | null;
    media: string[];
    createdAt: Date;
    updatedAt: Date;
    authorId: number;
    postId: number | null;
    commentId: number | null;
}
export type {FeedType, PostCommentsType}