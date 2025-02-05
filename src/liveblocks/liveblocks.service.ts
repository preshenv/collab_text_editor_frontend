import { Injectable } from '@nestjs/common';
import { Liveblocks } from '@liveblocks/node';
import { ConfigService } from '@nestjs/config';
import { CreateRoomAuthDto } from './types/liveblocks.types';

@Injectable()
export class LiveblocksService {
  private readonly liveblocks: Liveblocks;

  constructor(private configService: ConfigService) {
    this.liveblocks = new Liveblocks({
      secret: this.configService.get<string>('LIVE_BLOCKS_SECRET_KEY') || '',
    });
  }

  getClient(): Liveblocks {
    return this.liveblocks;
  }

  generateRandomHexColor() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, '0')}`;
  }

  async createRoomAuthorization({
    user,
    roomId,
    permissions,
  }: CreateRoomAuthDto) {
    const allowedPermission: ('room:read' | 'room:write')[] = [];

    const liveblocksClient = this.getClient();
    const session = liveblocksClient.prepareSession(user.$id, {
      userInfo: {
        name: user.name,
        color: this.generateRandomHexColor(),
      },
    });

    if (permissions.read) {
      allowedPermission.push('room:read');
    }
    if (permissions.update) {
      allowedPermission.push('room:write');
    }

    session.allow(roomId, allowedPermission);
    const { body, status } = await session.authorize();
    return { body, status };
  }
}
