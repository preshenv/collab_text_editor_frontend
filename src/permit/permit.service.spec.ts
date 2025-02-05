import { Test, TestingModule } from '@nestjs/testing';
import { PermitService } from './permit.service';

describe('PermitService', () => {
  let service: PermitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermitService],
    }).compile();

    service = module.get<PermitService>(PermitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
