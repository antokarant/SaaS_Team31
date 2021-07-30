import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddDatesOfCreation1622306049751 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
