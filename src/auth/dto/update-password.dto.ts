import { IsEmail, IsString, MinLength, Matches, IsOptional } from 'class-validator';

export class UpdatePasswordDto {
  @IsString({ message: 'Current password must be a string' })
  currentPassword: string;

  @IsString({ message: 'New password must be a string' })
  @MinLength(8, { message: 'New password must be at least 8 characters long' })
  @Matches(/([a-z])/, { message: 'Password must contain at least one lowercase letter' })
  @Matches(/([A-Z])/, { message: 'Password must contain at least one uppercase letter' })
  @Matches(/([!@#$%^&*(),.?":{}|<>])/, {
    message: 'Password must contain at least one special character',
  })
  newPassword: string;

  @IsOptional()
  @IsString({ message: 'Confirm new password must be a string' })
  confirmNewPassword: string;

  validateConfirmPassword() {
    return this.newPassword === this.confirmNewPassword;
  }
}