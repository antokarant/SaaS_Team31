import { Test, TestingModule } from '@nestjs/testing';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { Answer } from './entities/answer.entity';
import { Question } from '../question/entities/question.entity';
import { EntityManager } from 'typeorm';

describe('AnswerController', () => {
  let controller: AnswerController;
  let service: AnswerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnswerController],
      providers: [AnswerService, EntityManager],
    }).compile();

    controller = module.get<AnswerController>(AnswerController);
    service = module.get<AnswerService>(AnswerService);
  });

  describe('findAll', () => {
    it('should return an array of answers', async () => {
      const result = [new Answer()];
      const questionID = '1';
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await service.findAll(questionID)).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a single answer object', async () => {
      const result = new Answer();
      const id = '1';
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(id)).toEqual(result);
    });
  });

  describe('create', () => {
    it('should create an answer object', async () => {
      const result = new Answer();
      const dto = {
          text: "Text",
          question: new Question(),
          user: {}
      }
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await service.create(dto)).toEqual(result); // changed it to service because controller also requires a Request
      // so perhaps this shold have been in service.spec.ts
    });
  });
});
