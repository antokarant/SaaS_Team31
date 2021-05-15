import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Answer } from '../../answer/entities/answer.entity';

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ default: 0 })
    positiveVotes: number;

    @Column({ default: 0 })
    negativeVotes: number;

    @OneToMany(type => Answer, answer => answer.question) // answer.question is foreign key
    answers: Answer[];
}
