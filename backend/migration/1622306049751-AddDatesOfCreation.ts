import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDatesOfCreation1622306049751 implements MigrationInterface {
    name = 'AddDatesOfCreation1622306049751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `keyword` (`name` varchar(255) NOT NULL, PRIMARY KEY (`name`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `question` (`id` int NOT NULL AUTO_INCREMENT, `createdOn` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedOn` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `title` varchar(255) NOT NULL, `upvotes` int NOT NULL DEFAULT '0', `downvotes` int NOT NULL DEFAULT '0', `userID` int NULL, `keywordName` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `answer` (`id` int NOT NULL AUTO_INCREMENT, `createdOn` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedOn` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `text` varchar(255) NOT NULL, `positiveVotes` int NOT NULL DEFAULT '0', `negativeVotes` int NOT NULL DEFAULT '0', `questionID` int NULL, `userID` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `question` ADD CONSTRAINT `FK_0cfa7c861074ac0351b9f23a01d` FOREIGN KEY (`userID`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `question` ADD CONSTRAINT `FK_084d7f2ed58c822f3f5bb4079e2` FOREIGN KEY (`keywordName`) REFERENCES `keyword`(`name`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `answer` ADD CONSTRAINT `FK_0de0764ea76ba6a0ed6b3cb65e7` FOREIGN KEY (`questionID`) REFERENCES `question`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `answer` ADD CONSTRAINT `FK_bed1d8ca5ffb813fd85b264e6b9` FOREIGN KEY (`userID`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `answer` DROP FOREIGN KEY `FK_bed1d8ca5ffb813fd85b264e6b9`");
        await queryRunner.query("ALTER TABLE `answer` DROP FOREIGN KEY `FK_0de0764ea76ba6a0ed6b3cb65e7`");
        await queryRunner.query("ALTER TABLE `question` DROP FOREIGN KEY `FK_084d7f2ed58c822f3f5bb4079e2`");
        await queryRunner.query("ALTER TABLE `question` DROP FOREIGN KEY `FK_0cfa7c861074ac0351b9f23a01d`");
        await queryRunner.query("DROP TABLE `answer`");
        await queryRunner.query("DROP TABLE `question`");
        await queryRunner.query("DROP TABLE `keyword`");
        await queryRunner.query("DROP TABLE `user`");
    }

}
