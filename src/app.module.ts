import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PermitModule } from './permit/permit.module';
import { PermitController } from './permit/permit.controller';
import { LiveblocksController } from './liveblocks/liveblocks.controller';
import { LiveblocksModule } from './liveblocks/liveblocks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PermitModule,
    LiveblocksModule,
  ],
  controllers: [PermitController, LiveblocksController],
})
export class AppModule {}
