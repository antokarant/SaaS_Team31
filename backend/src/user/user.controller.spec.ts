import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { EntityManager } from 'typeorm';

// https://docs.nestjs.com/fundamentals/testing
describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, EntityManager],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [new User()];
      //jest.spyOn(service, 'findAll').mockImplementation(() => Promise.resolve(result));
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      //expect(await controller.findAll()).toBe(result);
      expect(await controller.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a single user object', async () => {
      const result = new User();
      const id = '1'; // wth it's a number in user.service.ts but here it requires string
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(id)).toEqual(result);
    });
  });

  describe('create', () => {
    it('should create a user object', async () => {
      const result = new User();
      const dto = {
          username: "MasterChief",
          password: "password"
      }
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(dto)).toEqual(result);
    });
  });
});
