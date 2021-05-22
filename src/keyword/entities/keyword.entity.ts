import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Question } from '../../question/entities/question.entity';

@Entity()
export class Keyword {
    @PrimaryColumn()
    name: string;

    @OneToMany(type => Question, question => question.keyword) // answer.question is foreign key
    questions: Question[];
}
