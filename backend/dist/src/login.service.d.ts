import { User } from './user/entities/user.entity';
import { EntityManager } from 'typeorm';
export declare class LoginService {
    private manager;
    constructor(manager: EntityManager);
    findOne(username: string): Promise<User>;
}
