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
exports.KeywordService = void 0;
const common_1 = require("@nestjs/common");
const keyword_entity_1 = require("./entities/keyword.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let KeywordService = class KeywordService {
    constructor(manager) {
        this.manager = manager;
    }
    async create(createKeywordDto) {
        const keyword = await this.manager.create(keyword_entity_1.Keyword, createKeywordDto);
        return this.manager.save(keyword);
    }
    async findAll() {
        return this.manager.find(keyword_entity_1.Keyword);
    }
    async findOne(name) {
        const result = await this.manager.findOne(keyword_entity_1.Keyword, name, { relations: ["questions"] });
        if (!result)
            throw new common_1.NotFoundException(`Keyword ${name} not found`);
        return result;
    }
    async findMostPopular() {
        const response = await this.manager.find(keyword_entity_1.Keyword, { relations: ["questions"] });
        if (!response)
            throw new common_1.NotFoundException(`Not found`);
        let sorted = response.sort((k1, k2) => { return k2.questions.length - k1.questions.length; });
        return sorted.slice(0, 5);
    }
    async update(name, updateKeywordDto) {
        return this.manager.transaction(async (manager) => {
            const keyword = await this.manager.findOne(keyword_entity_1.Keyword, name, { relations: ["questions"] });
            if (!keyword)
                throw new common_1.NotFoundException(`Keyword ${name} not found`);
            manager.merge(keyword_entity_1.Keyword, keyword, updateKeywordDto);
            return manager.save(keyword);
        });
    }
    remove(name) {
        return this.manager.transaction(async (manager) => {
            const keyword = await manager.findOne(keyword_entity_1.Keyword, name);
            if (!keyword)
                throw new common_1.NotFoundException(`Keyword ${name} not found`);
            await manager.delete(keyword_entity_1.Keyword, name);
        });
    }
};
KeywordService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectEntityManager()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], KeywordService);
exports.KeywordService = KeywordService;
//# sourceMappingURL=keyword.service.js.map