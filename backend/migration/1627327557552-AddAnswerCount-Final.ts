import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAnswerCountFinal1627327557552 implements MigrationInterface {
    name = 'AddAnswerCountFinal1627327557552'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `comment` DROP COLUMN `positiveVotes`");
        await queryRunner.query("ALTER TABLE `comment` DROP COLUMN `negativeVotes`");
        await queryRunner.query("ALTER TABLE `comment` ADD `upvotes` int NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `comment` ADD `downvotes` int NOT NULL DEFAULT '0'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `comment` DROP COLUMN `downvotes`");
        await queryRunner.query("ALTER TABLE `comment` DROP COLUMN `upvotes`");
        await queryRunner.query("ALTER TABLE `comment` ADD `negativeVotes` int NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `comment` ADD `positiveVotes` int NOT NULL DEFAULT '0'");
    }

}
