export interface User {
  email: string;
  key: string;
}

export interface ResourceInstance {
  key: string;
  resource: string;
}

export interface ResourceInstanceRole {
  user: string;
  role: string;
  resource_instance: string;
}

export enum PermissionType {
  READ = 'read',
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

export type ResourceType = 'document';

export interface ResourcePermission {
  user: string;
  resource_instance: string;
  permissions: PermissionType[];
}
