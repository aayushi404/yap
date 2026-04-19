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
        author: {
            name: string;
            username: string;
            profile: {
                profileImage: string;
            } | null;
        };
    }[];
    author: {
        name: string;
        username: string;
        profile: {
            profileImage: string;
        } | null;
    };
} & {
    id: number;
    text: string | null;
    media: string[];
    createdAt: Date;
    updatedAt: Date;
    postId: number | null;
    commentId: number | null;
    authorId: number;
}

type CommentType = {
    author: {
        name: string;
        username: string;
        profile: {
            profileImage: string;
        } | null;
    };
    _count: {
        comments: number;
    };
} & {
    text: string | null;
    media: string[];
    postId: number | null;
    commentId: number | null;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    authorId: number;
}
export type {FeedType, PostCommentsType, CommentType}