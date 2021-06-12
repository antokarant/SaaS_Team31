import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable } from 'typeorm';
import { Answer } from '../../answer/entities/answer.entity';
import { User } from '../../user/entities/user.entity';
import { Keyword } from '../../keyword/entities/keyword.entity';

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdOn: Date

    @UpdateDateColumn()
    updatedOn: Date;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ default: 0 })
    upvotes: number;

    @Column({ default: 0 })
    downvotes: number;

    @OneToMany(type => Answer, answer => answer.question) // answer.question is foreign key
    answers: Answer[];

    @ManyToOne( () => User, user => user.questions, { nullable: true, onDelete: "CASCADE" }) // delete all answers if the question is deleted
    @JoinColumn({name : 'userID'})
    user: User;

    // SEE https://orkhan.gitbook.io/typeorm/docs/many-to-many-relations
    @ManyToMany( () => Keyword, keyword => keyword.questions)
    @JoinTable()
    keywords: Keyword[];
}
