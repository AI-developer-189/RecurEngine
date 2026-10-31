import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    register(signupDto: {
        email: string;
        password: string;
        name: string;
        role?: string;
    }): Promise<any>;
    getMe(user: any): Promise<any>;
    getById(id: string, user: any): Promise<any>;
}
