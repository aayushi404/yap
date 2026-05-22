type userType = {
    profile: {
        profileImage: string;
    } | null;
} & {
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    password: string;
    username: string;
}

type PostType = {
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


export type {userType, PostType}