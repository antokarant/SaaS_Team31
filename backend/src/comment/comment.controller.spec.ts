import { Test, TestingModule } from '@nestjs/testing';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';
import { Answer } from '../answer/entities/answer.entity';
import { User } from '../user/entities/user.entity';
import { EntityManager } from 'typeorm';

describe('CommentController', () => {
  let controller: CommentController;
  let service: CommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [CommentService, EntityManager],
    }).compile();

    controller = module.get<CommentController>(CommentController);
    service = module.get<CommentService>(CommentService);
  });

  describe('findAll', () => {
    it('should return an array of comments', async () => {
      const result = [new Comment()];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a single comment object', async () => {
      const result = new Comment();
      const id = '1';
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(id)).toEqual(result);
    });
  });

  describe('create', () => {
    it('should create a comment object', async () => {
      const result = new Comment();
      const dto = {
          text: "Text",
          answer: new Answer(),
          user: new User()
      }
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(dto)).toEqual(result); // changed it to service because controller also requires a Request
      // so perhaps this shold have been in service.spec.ts
    });
  });
});
