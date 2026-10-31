import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';
import { RoomResponseModel } from '../models/room-response.model';
import { RoomQueryModel } from '../models/room-query-request.model';
import { ApiResponse } from '../../../shared/models/api-response.model';
import { CreateRoomRequestModel } from '../models/create-room-request.model';
import { UpdateRoomRequestModel } from '../models/update-room-request.model';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private readonly apiService = inject(ApiService);
  private readonly baseUrl = '/admin/Room';

  // Fetches all rooms from the API.

  getAllRooms(query: RoomQueryModel): Observable<ApiResponse<RoomResponseModel[]>> {
    return this.apiService.get<ApiResponse<RoomResponseModel[]>>(`${this.baseUrl}/get-all`, query);
  }

  getRoomById(id: number): Observable<ApiResponse<RoomResponseModel>> {
    return this.apiService.get<ApiResponse<RoomResponseModel>>(`${this.baseUrl}/${id}`);
  }

  isRoomAvailable(id: number): Observable<ApiResponse<boolean>> {
    return this.apiService.get<ApiResponse<boolean>>(`${this.baseUrl}/is-available/${id}`);
  }

  createRoom(request: CreateRoomRequestModel): Observable<ApiResponse<RoomResponseModel>> {
    return this.apiService.post<ApiResponse<RoomResponseModel>>(`${this.baseUrl}/create`, request);
  }

  updateRoom(
    id: number,
    request: UpdateRoomRequestModel,
  ): Observable<ApiResponse<RoomResponseModel>> {
    return this.apiService.put<ApiResponse<RoomResponseModel>>(
      `${this.baseUrl}/update/${id}`,
      request,
    );
  }

  deleteRoom(id: number): Observable<ApiResponse<string>> {
    return this.apiService.delete<ApiResponse<string>>(`${this.baseUrl}/delete/${id}`);
  }
}
