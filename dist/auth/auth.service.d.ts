import { UsersService } from '../users/users.service';
import { SigninDto } from './dto/signin.dto';
export declare class AuthService {
    private usersService;
    constructor(usersService: UsersService);
    signup(signupDto: SignupDto): Promise<{
        id: any;
        email: any;
        role: any;
    }>;
    signin(signinDto: SigninDto): Promise<any>;
    validateUserByCredentials(email: string, password: string): Promise<any>;
    validateUser(id: string): Promise<any>;
}
