import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from './user/entities/user.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class LoginService {
    constructor(@InjectEntityManager() private manager: EntityManager) {}

    async findOne(username: string) : Promise<User> {
        const result = await this.manager.findOne(User, {"username": username}); // the additional option joins tables and returns the correpsonding answers too
        if(!result) throw new NotFoundException(`User ${username} not found`);
        return result;
    }
}
