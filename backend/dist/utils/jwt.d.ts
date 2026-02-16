type payloadType = {
    userId: number;
};
declare const signJwt: (payload: payloadType) => string;
declare const verifyToken: (token: string) => payloadType;
export { signJwt, verifyToken };
//# sourceMappingURL=jwt.d.ts.map