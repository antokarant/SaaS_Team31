import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Answer } from '../../answer/entities/answer.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Comment {
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

    @ManyToOne( () => Answer, answer => answer.comments, { nullable: true, onDelete: "CASCADE" })
    @JoinColumn({name : 'answerID'})
    answer: Answer;

    @ManyToOne( () => User, user => user.comments, { nullable: true, onDelete: "CASCADE" })
    @JoinColumn({name : 'userID'})
    user: User;
}
