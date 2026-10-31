import { User } from '../prisma/model/user.model';
export declare class UsersService {
    private userModel;
    constructor(userModel: typeof User);
    findByEmail(email: string): Promise<any>;
    findOne(id: string): Promise<any>;
    create(userData: {
        email: string;
        password: string;
        name?: string;
        role?: string;
    }): Promise<any>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<any>;
}
