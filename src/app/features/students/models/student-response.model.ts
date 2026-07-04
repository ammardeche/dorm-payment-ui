import { StudentPaymentModel } from './student-payment.model';
import { StudentRoomModel } from './student-room.model';

export interface StudentResponseModel {
  id: number;

  firstName: string;
  lastName: string;

  studentNumber: string;

  email?: string;
  phoneNumber?: string;

  enrollmentDate: string;
  departureDate?: string;

  isActive: boolean;

  room?: StudentRoomModel;

  payments: StudentPaymentModel[];
}
