interface TokenPayload {
    userId: string;
    email: string;
}
declare class JWTService {
    private readonly secret;
    private readonly expiresIn;
    constructor();
    generateToken(payload: TokenPayload): string;
    verifyToken(token: string): TokenPayload | null;
    generateOTP(): string;
    getOTPExpiryTime(): Date;
}
declare const _default: JWTService;
export default _default;
