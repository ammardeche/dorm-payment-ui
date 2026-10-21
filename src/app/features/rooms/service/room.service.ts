import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';
import { RoomResponseModel } from '../models/room-response.model';
import { RoomQueryModel } from '../models/room-query-request.model';
import { ApiResponse } from '../../../shared/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class RoomService {

  private readonly apiService = inject(ApiService);
  private readonly baseUrl = '/admin/rooms';



  // Fetches all rooms from the API. 


  getAllRooms(query : RoomQueryModel) : Observable< ApiResponse<RoomResponseModel[]> > {
    return  this.apiService.get<ApiResponse<RoomResponseModel[]>>(`${this.baseUrl}/get-all`, query);
  }

} 
