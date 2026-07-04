import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { StudentFilterModel } from '../models/student-filter.model';
import { StudentResponseModel } from '../models/student-response.model';
import { ApiResponse } from '../../../shared/models/api-response.model';
import { Observable } from 'rxjs';
import { CreateStudentRequest } from '../models/create-student.model';
import { UpdateStudentRequest } from '../models/update-student.model';
import { DeactivateStudentRequest } from '../models/deactivate-student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private api = inject(ApiService);

  private readonly endpoint = '/Students';

  /**
   * GET ALL
   */
  getStudents(filters?: StudentFilterModel): Observable<ApiResponse<StudentResponseModel[]>> {
    return this.api.get<ApiResponse<StudentResponseModel[]>>(`${this.endpoint}/get-all`, filters);
  }

  /**
   * GET BY ID
   */
  getStudentById(id: number): Observable<ApiResponse<StudentResponseModel>> {
    return this.api.get<ApiResponse<StudentResponseModel>>(`${this.endpoint}/${id}`);
  }

  /**
   * CREATE
   */
  createStudent(payload: CreateStudentRequest): Observable<ApiResponse<StudentResponseModel>> {
    return this.api.post<ApiResponse<StudentResponseModel>>(`${this.endpoint}/create`, payload);
  }

  /**
   * UPDATE
   */
  updateStudent(id: number, payload: UpdateStudentRequest): Observable<ApiResponse<string>> {
    return this.api.put<ApiResponse<string>>(`${this.endpoint}/update/${id}`, payload);
  }

  /**
   * DEACTIVATE
   */
  deactivateStudent(
    id: number,
    payload: DeactivateStudentRequest,
  ): Observable<ApiResponse<string>> {
    return this.api.post<ApiResponse<string>>(`${this.endpoint}/deactivate/${id}`, payload);
  }

  /**
   * DELETE
   */
  deleteStudent(id: number): Observable<ApiResponse<string>> {
    return this.api.delete<ApiResponse<string>>(`${this.endpoint}/delete/${id}`);
  }
}
