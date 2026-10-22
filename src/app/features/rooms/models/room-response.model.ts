import { ReservationType } from "../../reservations/enums/reservation-type.enum";
import { RoomStatus } from "../enums/room-status.enum";
import { RoomStudentModel } from "./room-student.model";

export interface RoomReservationModel {
  id: number;
  type: ReservationType;
  checkIn: string;
  checkOut?: string;
  guestName?: string;
}

export interface RoomResponseModel {
  id: number;
  roomNumber?: number;
  floorNumber: number;
  capacity: number;
  currentOccupancy: number;
  status: RoomStatus;
  students: RoomStudentModel[];
  activeReservations: RoomReservationModel[];
}