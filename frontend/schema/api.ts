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

type userProfile = {
    name: string,
    username: string,
    id: number,
    createdAt: Date,
    followersCount: number,
    followingCount: number,
    postCount: number,
    bio: string | null,
    profileImage: string | null,
    isFollowing: boolean,
    isFollower: boolean
}

type userFollow = {
    id: number;
    name: string;
    username: string;
    profileImage: string | undefined;
    bio: string | null | undefined;
    isFollower: boolean;
    isFollowing: boolean;
}

type userSearch = {
    id: number,
    name: string,
    username: string,
    profileImage: string | undefined;
}

type updateProfileInput = {
    name: string,
    bio: string,
    profileImage: string | null | string[] | undefined
}
export type {FeedType, PostCommentsType, CommentType, userProfile, userFollow, userSearch, updateProfileInput}