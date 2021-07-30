"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const typeorm_1 = require("typeorm");
const answer_entity_1 = require("../../answer/entities/answer.entity");
const user_entity_1 = require("../../user/entities/user.entity");
let Comment = class Comment {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Comment.prototype, "id", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Comment.prototype, "createdOn", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Comment.prototype, "updatedOn", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Comment.prototype, "text", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Comment.prototype, "upvotes", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Comment.prototype, "downvotes", void 0);
__decorate([
    typeorm_1.ManyToOne(() => answer_entity_1.Answer, answer => answer.comments, { nullable: true, onDelete: "CASCADE" }),
    typeorm_1.JoinColumn({ name: 'answerID' }),
    __metadata("design:type", answer_entity_1.Answer)
], Comment.prototype, "answer", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.User, user => user.comments, { nullable: true, onDelete: "CASCADE" }),
    typeorm_1.JoinColumn({ name: 'userID' }),
    __metadata("design:type", user_entity_1.User)
], Comment.prototype, "user", void 0);
Comment = __decorate([
    typeorm_1.Entity()
], Comment);
exports.Comment = Comment;
//# sourceMappingURL=comment.entity.js.map