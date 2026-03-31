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

export type {userType}