import {
  ArrayUnique,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
import { PermissionType, ResourceType } from '../types/actions.types';

export class SyncUserDto {
  @IsEmail()
  email: string;

  @IsString()
  key: string;
}

export class CreateResourceInstanceDto {
  @IsString()
  key: string;

  @IsString()
  resource: string;
}

export class AssignResourceInstanceRoleToUserDto {
  @IsString()
  resource_instance: string;

  @IsString()
  role: string;

  @IsEmail()
  user: string;
}

export class GetResourcePermissionsDto {
  @IsArray()
  @IsEnum(PermissionType, { each: true })
  @ArrayUnique()
  permissions: PermissionType[];

  @IsString()
  @IsNotEmpty()
  @Matches(/^(document):[a-zA-Z0-9-]+$/, {
    message: 'Resource instance must be in format: document:id',
  })
  resource_instance: string;

  @IsEmail()
  @IsNotEmpty()
  user: string;

  static createResourceInstance(type: ResourceType, id: string): string {
    return `${type}:${id}`;
  }
}
