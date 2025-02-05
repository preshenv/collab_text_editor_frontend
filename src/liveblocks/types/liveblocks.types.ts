export interface User {
  $id: string;
  name: string;
}

export interface RoomPermissions {
  read: boolean;
  update: boolean;
}

export interface CreateRoomAuthDto {
  user: User;
  roomId: string;
  permissions: RoomPermissions;
}
