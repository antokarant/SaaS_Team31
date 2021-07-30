import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { EntityManager } from 'typeorm';
import { Comment } from './entities/comment.entity';
export declare class CommentService {
    private manager;
    constructor(manager: EntityManager);
    create(createCommentDto: CreateCommentDto): Promise<Comment>;
    findAll(): Promise<Comment[]>;
    findOne(id: number): Promise<Comment>;
    update(id: number, updateCommentDto: UpdateCommentDto): Promise<Comment>;
    remove(id: number): Promise<void>;
}
