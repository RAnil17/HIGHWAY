declare class EmailService {
    private transporter;
    constructor();
    sendOTP(email: string, otp: string): Promise<boolean>;
    sendWelcomeEmail(email: string): Promise<boolean>;
}
declare const _default: EmailService;
export default _default;
