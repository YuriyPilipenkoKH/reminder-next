type User = {
    _id: string;
    name: string;
    email: string;
    password: string;
    avatarURL: string;
    phone: string;
    company: string;
    location: string;
    isVerified: boolean;
    isAdmin: boolean;
    forgotPasswordToken: string;
    forgotPasswordTokenExpiry: Date | null;
    verifyToken: string;
    verifyTokenExpiry: Date | null;
}
export default User