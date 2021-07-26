import { Test, TestingModule } from '@nestjs/testing';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';
import { EntityManager } from 'typeorm';

describe('QuestionController', () => {
  let controller: QuestionController;
  let service: QuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionController],
      providers: [QuestionService, EntityManager],
    }).compile();

    controller = module.get<QuestionController>(QuestionController);
    service = module.get<QuestionService>(QuestionService);
  });

  describe('findAll', () => {
    it('should return an array of questions', async () => {
      const result = [new Question()];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a single question object', async () => {
      const result = new Question();
      const id = '1';
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(id)).toEqual(result);
    });
  });

  describe('create', () => {
    it('should create a question object', async () => {
      const result = new Question();
      const dto = {
          title: "Title",
          description: "Description",
          user: {}, // thankfully it's defined as "any"
          keywords: []
      }
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await service.create(dto)).toEqual(result); // changed it to service because controller also requires a Request
      // so perhaps this shold have been in service.spec.ts
    });
  });
});
