export declare class SignupDto {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
    validateConfirmPassword(): boolean;
}
export declare class SigninDto {
    email: string;
    password: string;
}
export declare class UpdatePasswordDto {
    currentPassword: string;
    newPassword: string;
}
