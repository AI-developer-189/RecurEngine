import { IsEmail, IsString, MinLength, Matches, IsOptional } from 'class-validator';

export class SignupDto {
  @IsEmail({ message: 'Email must be a valid email address' })
  email: string;

  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/([a-z])/, { message: 'Password must contain at least one lowercase letter' })
  @Matches(/([A-Z])/, { message: 'Password must contain at least one uppercase letter' })
  @Matches(/([!@#$%^&*(),.?":{}|<>])/, {
    message: 'Password must contain at least one special character',
  })
  password: string;

  @IsString({ message: 'Confirm password must be a string' })
  confirmPassword: string;

  validateConfirmPassword() {
    return this.password === this.confirmPassword;
  }
}

export class SigninDto {
  @IsEmail({ message: 'Email must be a valid email address' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  password: string;
}

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
}