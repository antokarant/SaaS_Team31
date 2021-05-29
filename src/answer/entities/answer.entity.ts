import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Question } from '../../question/entities/question.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Answer {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdOn: Date

    @UpdateDateColumn()
    updatedOn: Date;

    @Column()
    text: string;

    @Column({ default: 0 })
    positiveVotes: number;

    @Column({ default: 0 })
    negativeVotes: number;

    @ManyToOne( () => Question, question => question.answers, { nullable: true, onDelete: "CASCADE" }) // delete all answers if the question is deleted
    @JoinColumn({name : 'questionID'})
    question: Question;

    @ManyToOne( () => User, user => user.questions, { nullable: true, onDelete: "CASCADE" }) // delete all answers if the question is deleted
    @JoinColumn({name : 'userID'})
    user: User;
}
