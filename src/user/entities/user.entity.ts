import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Question } from '../../question/entities/question.entity';
import { Answer } from '../../answer/entities/answer.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @OneToMany(type => Question, question => question.user) // answer.question is foreign key
    questions: Question[];

    @OneToMany(type => Answer, answer => answer.user) // answer.question is foreign key
    answers: Answer[];
}
