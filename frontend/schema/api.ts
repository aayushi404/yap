type FeedType  = ({
    author: {
        name: string;
        username: string;
        profile: {
            profileImage: string;
        } | null;
    };
} & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    text: string | null;
    media: string[];
    authorId: number;
})

export type {FeedType}