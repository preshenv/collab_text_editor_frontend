import { Test, TestingModule } from '@nestjs/testing';
import { PermitController } from './permit.controller';

describe('PermitController', () => {
  let controller: PermitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermitController],
    }).compile();

    controller = module.get<PermitController>(PermitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
