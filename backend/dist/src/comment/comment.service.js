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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("./entities/comment.entity");
const answer_entity_1 = require("../answer/entities/answer.entity");
const user_entity_1 = require("../user/entities/user.entity");
let CommentService = class CommentService {
    constructor(manager) {
        this.manager = manager;
    }
    async create(createCommentDto) {
        return this.manager.transaction(async (manager) => {
            const answerID = createCommentDto.answer.id;
            if (!answerID)
                throw new common_1.BadRequestException('Answer id missing.');
            const answer = await this.manager.findOne(answer_entity_1.Answer, createCommentDto.answer.id);
            if (!answer)
                throw new common_1.NotFoundException(`Answer ${answerID} not found.`);
            const userID = createCommentDto.user.id;
            if (!userID)
                throw new common_1.BadRequestException('User id missing.');
            const user = await this.manager.findOne(user_entity_1.User, createCommentDto.user.id);
            if (!user)
                throw new common_1.NotFoundException(`User ${userID} not found.`);
            const comment = await this.manager.create(comment_entity_1.Comment, createCommentDto);
            comment.answer = answer;
            comment.user = user;
            return this.manager.save(comment);
        });
    }
    async findAll() {
        return this.manager.find(comment_entity_1.Comment, { relations: ["comment"] });
    }
    async findOne(id) {
        const comment = await this.manager.findOne(comment_entity_1.Comment, id, { relations: ["comment"] });
        if (!comment)
            throw new common_1.NotFoundException(`Comment ${id} not found.`);
        return comment;
    }
    async update(id, updateCommentDto) {
        return this.manager.transaction(async (manager) => {
            const comment = await manager.findOne(comment_entity_1.Comment, id, { relations: ["comment"] });
            if (!comment)
                throw new common_1.NotFoundException(`Comment ${id} not found.`);
            manager.merge(comment_entity_1.Comment, comment, updateCommentDto);
            return manager.save(comment);
        });
    }
    async remove(id) {
        return this.manager.transaction(async (manager) => {
            const comment = await manager.findOne(comment_entity_1.Comment, id);
            if (!comment)
                throw new common_1.NotFoundException(`Comment ${id} not found.`);
            await manager.delete(comment_entity_1.Comment, id);
        });
    }
};
CommentService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectEntityManager()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map