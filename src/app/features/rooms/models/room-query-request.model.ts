import { RoomStatus } from '../enums/room-status.enum';

export interface RoomQueryModel {
  status?: RoomStatus;
  floorNumber?: number;

  pageIndex?: number;
  pageSize?: number;
}
