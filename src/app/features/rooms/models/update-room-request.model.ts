import { RoomStatus } from '../enums/room-status.enum';

export interface UpdateRoomRequestModel {
  roomNumber?: number;
  capacity?: number;
  status?: RoomStatus;
}
