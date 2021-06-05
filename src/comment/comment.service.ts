import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Answer } from '../answer/entities/answer.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class CommentService {
    constructor(@InjectEntityManager() private manager: EntityManager) {}

    async create(createCommentDto: CreateCommentDto): Promise<Comment> {
        return this.manager.transaction(async manager => {
            const answerID = createCommentDto.answer.id;
            if(!answerID) throw new BadRequestException('Answer id missing.');
            const answer = await this.manager.findOne(Answer, createCommentDto.answer.id);
            if(!answer) throw new NotFoundException(`Answer ${answerID} not found.`);

            const userID = createCommentDto.user.id;
            if(!userID) throw new BadRequestException('User id missing.');
            const user = await this.manager.findOne(User, createCommentDto.user.id);
            if(!user) throw new NotFoundException(`User ${userID} not found.`);

            const comment = await this.manager.create(Comment, createCommentDto);
            comment.answer = answer;
            comment.user = user;
            return this.manager.save(comment);
        });
    }

    async findAll(): Promise<Comment[]> {
        return this.manager.find(Comment, { relations: ["comment"] });
    }

    async findOne(id: number): Promise<Comment> {
        const comment = await this.manager.findOne(Comment, id, { relations: ["comment"] });
        if(!comment) throw new NotFoundException(`Comment ${id} not found.`);
        return comment;
    }

    async update(id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
        return this.manager.transaction(async manager => {
            const comment = await manager.findOne(Comment, id, { relations: ["comment"] });
            if(!comment) throw new NotFoundException(`Comment ${id} not found.`);
            manager.merge(Comment, comment, updateCommentDto);
            return manager.save(comment);
        });
    }

    async remove(id: number): Promise<void> {
        return this.manager.transaction(async manager => {
            const comment = await manager.findOne(Comment, id);
            if(!comment) throw new NotFoundException(`Comment ${id} not found.`);
            await manager.delete(Comment, id);
        });
    }
}
