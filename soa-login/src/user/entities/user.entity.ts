import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
/*
import { Question } from '../../question/entities/question.entity';
import { Answer } from '../../answer/entities/answer.entity';
import { Comment } from '../../comment/entities/comment.entity';
*/
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdOn: Date;

    @UpdateDateColumn()
    updatedOn: Date;
/*
    @OneToMany(type => Question, question => question.user) // question.user is foreign key
    questions: Question[];

    @OneToMany(type => Answer, answer => answer.user)
    answers: Answer[];

    @OneToMany(type => Comment, comment => comment.user)
    comments: Comment[];*/
}
