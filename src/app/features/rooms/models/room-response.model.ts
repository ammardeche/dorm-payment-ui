import { RoomStatus } from '../enums/room-status.enum';
import { StudentRoomModel } from './room-student.model';

export interface RoomResponseModel {
  id: number;

  roomNumber: number;
  capacity: number;

  floorNumber: number;

  status: RoomStatus;

  occupiedBeds: number;
  availableBeds: number;

  studentCount: number;
  reservationCount: number;
  invitationCount: number;

  students: StudentRoomModel[];
}
