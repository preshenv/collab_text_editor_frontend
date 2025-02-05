import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LiveblocksService } from './liveblocks.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [LiveblocksService],
  exports: [LiveblocksService],
})
export class LiveblocksModule {}
