import { LoginService } from "./login.service";
export declare type User = any;
export declare class UsersService {
    private readonly loginService;
    constructor(loginService: LoginService);
    private readonly users;
    findOne(username: string): Promise<User | undefined>;
}
