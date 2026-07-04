export interface StudentFilterModel {
  roomId?: number;
  isActive?: boolean;
  studentNumber: string;

  pageIndex: number;
  pageSize: number;
}
