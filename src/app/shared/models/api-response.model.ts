import { PaginationModel } from './pagination.model';

export interface ApiResponse<T> {
  payload: T;
  pagination?: PaginationModel;
  message?: string;
}
