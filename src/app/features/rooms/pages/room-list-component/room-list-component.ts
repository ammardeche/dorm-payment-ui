import { Component, inject, OnInit, signal } from '@angular/core';
import { RoomService } from '../../service/room.service';
import { PaginationModel } from '../../../../shared/models/pagination.model';
import { RoomResponseModel } from '../../models/room-response.model';
import { RoomQueryModel } from '../../models/room-query-request.model';
import { RoomCardComponent } from '../../components/room-card-component/room-card-component';
import { Pagination } from '../../../../shared/components/pagination/pagination';

const DEFAULT_PAGINATION: PaginationModel = {
  pageIndex: 1,
  pageSize: 10,
  totalCount: 0,
};

const DEFAULT_FILTER: RoomQueryModel = {
  status: undefined,
  floorNumber: undefined,
  pageIndex: 1,
  pageSize: 10,
};


@Component({
  selector: 'app-room-list-component',
  imports: [RoomCardComponent , Pagination],
  templateUrl: './room-list-component.html',
  styleUrl: './room-list-component.css',
})
export class RoomListComponent implements OnInit {
 
  private readonly roomService = inject(RoomService);
  rooms = signal<RoomResponseModel[]>([]);
  pagination = signal<PaginationModel>({ ...DEFAULT_PAGINATION });

 private currentFilters: RoomQueryModel = { 
  ...DEFAULT_FILTER
  };

   ngOnInit(): void {
    this.fetchRooms();
  }


   onPageChanged(pageIndex: number): void {
    this.currentFilters = { ...this.currentFilters, pageIndex };
    this.fetchRooms();
  }


  private fetchRooms (): void {
  
    this.roomService.getAllRooms(this.currentFilters).subscribe( {
      next: (response) => {
        this.rooms.set(response.payload);
        
        if (response.pagination) {
          this.pagination.set(response.pagination);
        }
      } , 

      error: (error) => {
        console.error('Error fetching rooms:', error);
      }
    });

  }

}
