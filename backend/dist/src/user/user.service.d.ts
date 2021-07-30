import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { EntityManager } from 'typeorm';
export declare class UserService {
    private manager;
    constructor(manager: EntityManager);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<void>;
}
