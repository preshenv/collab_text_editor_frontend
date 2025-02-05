import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { PermitService } from './permit.service';
import {
  AssignResourceInstanceRoleToUserDto,
  CreateResourceInstanceDto,
  GetResourcePermissionsDto,
  SyncUserDto,
} from './dto/sync-user.dto';

@Controller('permissions')
export class PermitController {
  constructor(private permitService: PermitService) {}

  @Post('sync')
  async syncUserWithPermit(@Body() body: SyncUserDto): Promise<any> {
    const result = await this.permitService.syncUserWithPermit(body);
    if (!result.success) {
      throw new UnauthorizedException('Access Denied');
    }
    return {
      message: result.message,
    };
  }

  @Post('createresource')
  async createResourceInstance(
    @Body() body: CreateResourceInstanceDto,
  ): Promise<any> {
    const result = await this.permitService.createResourceInstance(body);
    if (!result) {
      throw new UnauthorizedException('Access Denied');
    }
    return {
      result: result,
    };
  }

  @Post('assignresourcetouser')
  async assignResourceInstanceRoleToUser(
    @Body() body: AssignResourceInstanceRoleToUserDto,
  ): Promise<any> {
    const result =
      await this.permitService.assignResourceInstanceRoleToUser(body);
    if (!result) {
      throw new UnauthorizedException('Access Denied');
    }
    return {
      result: result,
    };
  }

  @Post('getresourcepermissions')
  async getResourcePermissions(
    @Body() body: GetResourcePermissionsDto,
  ): Promise<any> {
    const result = await this.permitService.getResourcePermissions(body);
    if (!result) {
      throw new UnauthorizedException('Access Denied');
    }
    return {
      result: result,
    };
  }
}
