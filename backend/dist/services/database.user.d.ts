declare const findUserById: (userId: number) => Promise<({
    profile: {
        profileImage: string;
    } | null;
} & {
    email: string;
    password: string;
    username: string;
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}) | null>;
declare const findUserByUsername: (username: string) => Promise<({
    profile: {
        profileImage: string;
    } | null;
} & {
    email: string;
    password: string;
    username: string;
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}) | null>;
declare const findUserByEmail: (email: string) => Promise<({
    profile: {
        profileImage: string;
    } | null;
} & {
    email: string;
    password: string;
    username: string;
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}) | null>;
export { findUserByEmail, findUserById, findUserByUsername };
//# sourceMappingURL=database.user.d.ts.map