import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Answer } from '../../answer/entities/answer.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ default: 0 })
    upvotes: number;

    @Column({ default: 0 })
    downvotes: number;

    @OneToMany(type => Answer, answer => answer.question) // answer.question is foreign key
    answers: Answer[];

    @ManyToOne( () => User, user => user.questions, { nullable: true, onDelete: "CASCADE" }) // delete all answers if the question is deleted
    @JoinColumn({name : 'userID'})
    user: User;
}
