import { AuthService } from './auth.service';
export declare class AppController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
    }>;
    healthcheck(): Promise<boolean>;
}
