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
exports.QuestionController = void 0;
const common_1 = require("@nestjs/common");
const question_service_1 = require("./question.service");
const create_question_dto_1 = require("./dto/create-question.dto");
const update_question_dto_1 = require("./dto/update-question.dto");
const jwt_auth_guard_1 = require("../jwt-auth.guard");
let QuestionController = class QuestionController {
    constructor(questionService) {
        this.questionService = questionService;
    }
    create(createQuestionDto, req) {
        createQuestionDto.user = { "id": req.user.id };
        return this.questionService.create(createQuestionDto);
    }
    findAllUser(req) {
        return this.questionService.findAllUser(req.user.id);
    }
    findAll() {
        return this.questionService.findAll();
    }
    findAllLatest() {
        return this.questionService.findAllLatest();
    }
    findUnanswered() {
        return this.questionService.findUnanswered();
    }
    findMostPopular() {
        return this.questionService.findMostPopular();
    }
    findOne(id) {
        return this.questionService.findOne(+id);
    }
    findKeyword(word) {
        return this.questionService.findAllKeyword(word);
    }
    update(id, updateQuestionDto) {
        return this.questionService.update(+id, updateQuestionDto);
    }
    remove(id) {
        return this.questionService.remove(+id);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_question_dto_1.CreateQuestionDto, Object]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "create", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get("user"),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "findAllUser", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "findAll", null);
__decorate([
    common_1.Get('latest'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "findAllLatest", null);
__decorate([
    common_1.Get('unanswered'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "findUnanswered", null);
__decorate([
    common_1.Get('popular'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "findMostPopular", null);
__decorate([
    common_1.Get('id/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "findOne", null);
__decorate([
    common_1.Get('keyword/:word'),
    __param(0, common_1.Param('word')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "findKeyword", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Patch(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_question_dto_1.UpdateQuestionDto]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "update", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "remove", null);
QuestionController = __decorate([
    common_1.Controller('question'),
    __metadata("design:paramtypes", [question_service_1.QuestionService])
], QuestionController);
exports.QuestionController = QuestionController;
//# sourceMappingURL=question.controller.js.map