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
exports.AnswerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const answer_entity_1 = require("./entities/answer.entity");
const question_entity_1 = require("../question/entities/question.entity");
const user_entity_1 = require("../user/entities/user.entity");
let AnswerService = class AnswerService {
    constructor(manager) {
        this.manager = manager;
    }
    async create(createAnswerDto) {
        return this.manager.transaction(async (manager) => {
            const questionID = createAnswerDto.question.id;
            if (!questionID)
                throw new common_1.BadRequestException('Question id missing.');
            const question = await this.manager.findOne(question_entity_1.Question, createAnswerDto.question.id);
            if (!question)
                throw new common_1.NotFoundException(`Question ${questionID} not found.`);
            const userID = createAnswerDto.user.id;
            if (!userID)
                throw new common_1.BadRequestException('User id missing.');
            const user = await this.manager.findOne(user_entity_1.User, createAnswerDto.user.id);
            if (!user)
                throw new common_1.NotFoundException(`User ${userID} not found.`);
            const answer = await this.manager.create(answer_entity_1.Answer, createAnswerDto);
            answer.question = question;
            answer.user = user;
            let c = question.answerCount + 1;
            await this.manager.update(question_entity_1.Question, questionID, { answerCount: c });
            return this.manager.save(answer);
        });
    }
    async findAll(id) {
        const result = await this.manager.createQueryBuilder('answer', 'answer')
            .leftJoinAndSelect('answer.user', 'user')
            .leftJoinAndSelect('answer.question', 'question')
            .leftJoinAndSelect('answer.comments', 'comments')
            .where('answer.userID = :id', { id })
            .orderBy('answer.createdOn', 'DESC')
            .getMany();
        console.log(result);
        return result;
    }
    async findOne(id) {
        const answer = await this.manager.findOne(answer_entity_1.Answer, id, { relations: ["question"] });
        if (!answer)
            throw new common_1.NotFoundException(`Answer ${id} not found.`);
        return answer;
    }
    async update(id, updateAnswerDto) {
        return this.manager.transaction(async (manager) => {
            const answer = await manager.findOne(answer_entity_1.Answer, id, { relations: ["question"] });
            if (!answer)
                throw new common_1.NotFoundException(`Answer ${id} not found.`);
            manager.merge(answer_entity_1.Answer, answer, updateAnswerDto);
            return manager.save(answer);
        });
    }
    async remove(id) {
        return this.manager.transaction(async (manager) => {
            const answer = await manager.findOne(answer_entity_1.Answer, id);
            if (!answer)
                throw new common_1.NotFoundException(`Answer ${id} not found.`);
            await manager.update(question_entity_1.Question, answer.question.id, { answerCount: answer.question.answerCount - 1 });
            await manager.delete(answer_entity_1.Answer, id);
        });
    }
};
AnswerService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectEntityManager()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], AnswerService);
exports.AnswerService = AnswerService;
//# sourceMappingURL=answer.service.js.map