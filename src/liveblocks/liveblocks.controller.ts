import { Controller, Post, Body } from '@nestjs/common';
import { LiveblocksService } from './liveblocks.service';
import { CreateRoomAuthDto } from './types/liveblocks.types';

@Controller('liveblocks')
export class LiveblocksController {
  constructor(private readonly liveblocksService: LiveblocksService) {}

  @Post('auth')
  async createRoomAuthorization(@Body() createRoomAuthDto: CreateRoomAuthDto) {
    const { body } =
      await this.liveblocksService.createRoomAuthorization(createRoomAuthDto);
    const tokenData = JSON.parse(body);
    return tokenData;
  }
}
