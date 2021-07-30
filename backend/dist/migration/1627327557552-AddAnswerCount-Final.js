"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAnswerCountFinal1627327557552 = void 0;
class AddAnswerCountFinal1627327557552 {
    constructor() {
        this.name = 'AddAnswerCountFinal1627327557552';
    }
    async up(queryRunner) {
        await queryRunner.query("ALTER TABLE `comment` DROP COLUMN `positiveVotes`");
        await queryRunner.query("ALTER TABLE `comment` DROP COLUMN `negativeVotes`");
        await queryRunner.query("ALTER TABLE `comment` ADD `upvotes` int NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `comment` ADD `downvotes` int NOT NULL DEFAULT '0'");
    }
    async down(queryRunner) {
        await queryRunner.query("ALTER TABLE `comment` DROP COLUMN `downvotes`");
        await queryRunner.query("ALTER TABLE `comment` DROP COLUMN `upvotes`");
        await queryRunner.query("ALTER TABLE `comment` ADD `negativeVotes` int NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `comment` ADD `positiveVotes` int NOT NULL DEFAULT '0'");
    }
}
exports.AddAnswerCountFinal1627327557552 = AddAnswerCountFinal1627327557552;
//# sourceMappingURL=1627327557552-AddAnswerCount-Final.js.map