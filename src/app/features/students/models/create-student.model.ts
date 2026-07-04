export interface CreateStudentRequest {
  firstName: string;
  lastName: string;

  email: string;

  studentNumber: string;

  phoneNumber?: string;

  roomId?: number;

  password: string;
}
