import { ReservationType } from "../../reservations/enums/reservation-type.enum";
import { RoomStatus } from "../enums/room-status.enum";
import {  RoomStudentResponseModel } from "./room-student.model";



export interface RoomReservationResponseModel {
  id: number;
  type: ReservationType;
  checkIn: string; // JSON date-time string, not a JavaScript Date
  checkOut: string | null;
  guestName: string | null;
}

export interface RoomResponseModel {
  id: number;
  roomNumber: number | null;
  floorNumber: number;
  capacity: number;
  currentOccupancy: number;
  status: RoomStatus;
  students: RoomStudentResponseModel[];
  activeReservations: RoomReservationResponseModel[];
}