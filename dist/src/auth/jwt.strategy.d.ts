import { AuthService } from './auth.service';
declare const LocalStrategy_base: new (...args: import("@nestjs/passport").WithoutCallback<import("@nestjs/passport").AllConstructorParameters<any>>) => InstanceType<any> & {
    validate(...args: any[]): unknown;
};
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(email: string, password: string): Promise<any>;
}
export {};
