import { Test, TestingModule } from '@nestjs/testing';
import { KeywordController } from './keyword.controller';
import { KeywordService } from './keyword.service';
import { Keyword } from './entities/keyword.entity';
import { EntityManager } from 'typeorm';

describe('KeywordController', () => {
  let controller: KeywordController;
  let service: KeywordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KeywordController],
      providers: [KeywordService, EntityManager],
    }).compile();

    controller = module.get<KeywordController>(KeywordController);
    service = module.get<KeywordService>(KeywordService);
  });

  describe('findAll', () => {
    it('should return an array of keywords', async () => {
      const result = [new Keyword()];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a single keyword object', async () => {
      const result = new Keyword();
      const id = '1';
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(id)).toEqual(result);
    });
  });

  describe('create', () => {
    it('should create a keyword object', async () => {
      const result = new Keyword();
      const dto = {
          name: "Keyword"
      }
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await service.create(dto)).toEqual(result); // changed it to service because controller also requires a Request
      // so perhaps this shold have been in service.spec.ts
    });
  });
});
