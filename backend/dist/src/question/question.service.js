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
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const question_entity_1 = require("./entities/question.entity");
const user_entity_1 = require("../user/entities/user.entity");
const answer_entity_1 = require("../answer/entities/answer.entity");
const keyword_entity_1 = require("../keyword/entities/keyword.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let QuestionService = class QuestionService {
    constructor(manager) {
        this.manager = manager;
    }
    async create(createQuestionDto) {
        return this.manager.transaction(async (manager) => {
            const userID = createQuestionDto.user.id;
            if (!userID)
                throw new common_1.BadRequestException('User id missing.');
            const user = await this.manager.findOne(user_entity_1.User, createQuestionDto.user.id);
            if (!user)
                throw new common_1.NotFoundException(`User ${userID} not found.`);
            let keywordList = [];
            for (const kw of createQuestionDto.keywords) {
                const keywordName = kw.name;
                if (!keywordName)
                    throw new common_1.BadRequestException('Keyword name missing.');
                const keyword = await this.manager.findOne(keyword_entity_1.Keyword, keywordName);
                if (!keyword)
                    throw new common_1.NotFoundException(`Keyword ${keywordName} not found.`);
                keywordList.push(keyword);
            }
            const question = await this.manager.create(question_entity_1.Question, createQuestionDto);
            question.user = user;
            question.keywords = keywordList;
            return this.manager.save(question);
        });
    }
    async findAllUser(id) {
        const result = await this.manager.createQueryBuilder('question', 'question')
            .leftJoinAndSelect('question.user', 'user')
            .leftJoinAndSelect('question.answers', 'answers')
            .leftJoinAndSelect('question.keywords', 'keywords')
            .where('question.userID = :id', { id })
            .orderBy('question.createdOn', 'DESC')
            .getMany();
        return result;
    }
    async findAll() {
        const result = await this.manager.find(question_entity_1.Question, { relations: ["user", "answers", "keywords"] });
        return result;
    }
    async findAllLatest() {
        const result = await this.manager.find(question_entity_1.Question, { order: { createdOn: 'DESC' }, take: 15, relations: ["user", "answers", "keywords"] });
        return result;
    }
    async findUnanswered() {
        const result = await this.manager.find(question_entity_1.Question, {
            order: { createdOn: 'DESC' },
            relations: ["user", "answers", "keywords"],
            where: {
                answerCount: 0
            }
        });
        return result;
    }
    async findMostPopular() {
        const result = await this.manager.find(question_entity_1.Question, { order: { upvotes: 'DESC' }, take: 15, relations: ["user", "answers", "keywords"] });
        return result;
    }
    async findAllKeyword(keyword) {
        const result = await this.manager.findOne(keyword_entity_1.Keyword, keyword, { relations: ["questions"] });
        let finalresult = [];
        for (const q of result.questions.reverse()) {
            const tempresult = await this.manager.findOne(question_entity_1.Question, q.id, { relations: ["keywords", "answers", "user"] });
            finalresult.push(tempresult);
        }
        return finalresult;
    }
    async findOne(id) {
        let question = await this.manager.findOne(question_entity_1.Question, id, { relations: ["user", "keywords", "answers"] });
        if (!question)
            throw new common_1.NotFoundException(`Question ${id} not found.`);
        for (let a in question.answers) {
            const answer = await this.manager.findOne(answer_entity_1.Answer, question.answers[a].id, { relations: ["user"] });
            question.answers[a] = answer;
        }
        return question;
    }
    async update(id, updateQuestionDto) {
        return this.manager.transaction(async (manager) => {
            const question = await manager.findOne(question_entity_1.Question, id, { relations: ["user", "keywords"] });
            if (!question)
                throw new common_1.NotFoundException(`Question ${id} not found.`);
            manager.merge(question_entity_1.Question, question, updateQuestionDto);
            return manager.save(question);
        });
    }
    async remove(id) {
        return this.manager.transaction(async (manager) => {
            const question = await manager.findOne(question_entity_1.Question, id);
            if (!question)
                throw new common_1.NotFoundException(`Question ${id} not found.`);
            await manager.delete(question_entity_1.Question, id);
        });
    }
};
QuestionService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectEntityManager()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], QuestionService);
exports.QuestionService = QuestionService;
//# sourceMappingURL=question.service.js.map