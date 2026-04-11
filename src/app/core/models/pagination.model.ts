export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

export interface PaginationParams {
  pageNumber: number;
  pageSize: number;
  search?: string;
}
