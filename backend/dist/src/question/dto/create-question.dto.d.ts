import { Keyword } from '../../keyword/entities/keyword.entity';
export declare class CreateQuestionDto {
    readonly title: string;
    readonly description: string;
    user: any;
    readonly keywords: Keyword[];
}
