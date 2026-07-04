import { RoomStatus } from '../enums/room-status.enum';

export interface RoomFilterModel {
  status: RoomStatus | null;
  floorNumber: number | null;
}
