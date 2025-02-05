import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Permit } from 'permitio';
import {
  PermissionType,
  ResourceInstance,
  ResourceInstanceRole,
  ResourcePermission,
  User,
} from './types/actions.types';

@Injectable()
export class PermitService {
  private permitClient: Permit;

  constructor(private configService: ConfigService) {
    this.permitClient = new Permit({
      pdp:
        this.configService.get<string>('PERMIT_PDP_URL') ||
        'http://localhost:7766',
      token: this.configService.get<string>('PERMIT_API_KEY'),
    });
  }

  getClient(): Permit {
    return this.permitClient;
  }

  async syncUserWithPermit(user: User): Promise<any> {
    const permit = this.getClient();
    const syncedUser = await permit.api.syncUser(user);

    return {
      success: true,
      message: `${syncedUser.email} synced with Permit.io`,
    };
  }

  async getPermitioUser(key: string) {
    try {
      const permit = this.getClient();
      const user = await permit.api.users.getByKey(key);
      return user;
    } catch (error) {
      return null;
    }
  }

  async createResourceInstance(resourceInstance: ResourceInstance) {
    try {
      const permit = this.getClient();
      const createdInstance = await permit.api.resourceInstances.create({
        key: resourceInstance.key,
        tenant: 'default',
        resource: resourceInstance.resource,
      });

      return createdInstance;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log('An unknown error occurred');
      }

      return null;
    }
  }

  async assignResourceInstanceRoleToUser(
    resourceInstanceRole: ResourceInstanceRole,
  ) {
    try {
      const user = await this.getPermitioUser(resourceInstanceRole.user);

      if (!user) {
        await this.syncUserWithPermit({
          email: resourceInstanceRole.user,
          key: resourceInstanceRole.user,
        });
      }
      const permit = this.getClient();
      const assignedRole = await permit.api.roleAssignments.assign({
        user: resourceInstanceRole.user,
        role: resourceInstanceRole.role,
        resource_instance: resourceInstanceRole.resource_instance,
        tenant: 'default',
      });

      return assignedRole;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log('An unknown error occurred');
      }

      return null;
    }
  }

  async getResourcePermissions(resourcePermission: ResourcePermission) {
    try {
      const permissions = resourcePermission.permissions;

      const permissionMap: Record<PermissionType, boolean> = {
        read: false,
        create: false,
        delete: false,
        update: false,
      };
      const permit = this.getClient();

      for await (const permission of permissions) {
        permissionMap[permission] = await permit.check(
          resourcePermission.user,
          permission,
          resourcePermission.resource_instance,
        );
      }

      return permissionMap;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log('An unknown error occurred');
      }

      return {
        read: false,
        create: false,
        delete: false,
        update: false,
      };
    }
  }
}
