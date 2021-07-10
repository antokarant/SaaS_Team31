import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectEntityManager() private manager: EntityManager) {}

    async create(createUserDto: CreateUserDto) : Promise<User> { // typescript requires specification of return type
        const result = await this.manager.findOne(User, {"username": createUserDto.username}); 
        if(result) throw new NotFoundException(`User ${createUserDto.username} already exists`);// so that no users with same username exist
        const user = await this.manager.create(User, createUserDto); // createUserDto is a subtype of user
        return this.manager.save(user); // returns a promise for the quiz as it was saved in the database
        // not returning user after saving because the promise includes the automatically generated id (by the orm)
    }

    async findAll() : Promise<User[]> {
        return this.manager.find(User); // does not need await, returns promise
    }

    async findOne(id: number) : Promise<User> {
        const result = await this.manager.findOne(User, id, { relations: ["questions", "answers"] }); // the additional option joins tables and returns the correpsonding answers too
        if(!result) throw new NotFoundException(`User ${id} not found`);
        return result;
    }

    async update(id: number, updateUserDto: UpdateUserDto) : Promise<User> {
        // very important that the process be atomic, that is, account for the fact that the data might change during the update (bank accounts etc)
        return this.manager.transaction(async manager => {
            const user = await this.manager.findOne(User, id, { relations: ["questions", "answers"] });
            if(!user) throw new NotFoundException(`User ${id} not found`);
            manager.merge(User, user, updateUserDto);
            return manager.save(user);
        });
    }

    remove(id: number) : Promise<void> {
        return this.manager.transaction(async manager => {
            const user = await manager.findOne(User, id);
            if(!user) throw new NotFoundException(`User ${id} not found`);
            await manager.delete(User, id);
        });
    }
}
