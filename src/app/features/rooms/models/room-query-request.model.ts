import { RoomStatus } from '../enums/room-status.enum';

export interface RoomQueryModel {
  status?: RoomStatus | null;
  floorNumber?: number | null;
  pageIndex?: number; // Backend default: 1
  pageSize?: number; // Backend default: 10; service maximum: 100
}