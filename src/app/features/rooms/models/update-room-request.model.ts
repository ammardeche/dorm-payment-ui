import { RoomStatus } from '../enums/room-status.enum';

export interface UpdateRoomRequestModel {
  roomNumber?: number | null;
  capacity?: number | null;
  status?: RoomStatus | null;
}
