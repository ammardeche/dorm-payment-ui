import { Component, inject, OnInit, signal } from '@angular/core';
import { RoomService } from '../../service/room.service';
import { PaginationModel } from '../../../../shared/models/pagination.model';
import { RoomResponseModel } from '../../models/room-response.model';
import { RoomQueryModel } from '../../models/room-query-request.model';
import { RoomCardComponent } from '../../components/room-card-component/room-card-component';
import { Pagination } from '../../../../shared/components/pagination/pagination';
import { RoomStatsResponse } from '../../models/student-stats-response.model';
import { MetricRoomCard } from '../../components/metric-room-card/metric-room-card';
import { RoomFilterComponent } from '../../components/room-filter-component/room-filter-component';
import { RoomFilterModel } from '../../models/room-filter-model';

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
  imports: [RoomCardComponent, Pagination, MetricRoomCard, RoomFilterComponent],
  templateUrl: './room-list-component.html',
  styleUrl: './room-list-component.css',
})
export class RoomListComponent implements OnInit {
 
  private readonly roomService = inject(RoomService);
  rooms = signal<RoomResponseModel[]>([]);
  pagination = signal<PaginationModel>({ ...DEFAULT_PAGINATION });
  roomStats = signal<RoomStatsResponse | null>(null);
  
 private currentFilters: RoomQueryModel = { 
  ...DEFAULT_FILTER
  };

   ngOnInit(): void {
    this.getStatus();
    this.fetchRooms();

    console.log(this.fetchRooms());
  }


   onPageChanged(pageIndex: number): void {
    this.currentFilters = { ...this.currentFilters, pageIndex };
    this.fetchRooms();
  }


  getStatus(): void {
  this.roomService.getStudentStats().subscribe(
    {
      next: (response) => {
        this.roomStats.set(response.payload);
      }
    }
  )
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

  onFilterChanged(filters: RoomFilterModel): void {
    this.currentFilters = {
    status: filters.status ?? undefined,
    floorNumber: filters.floorNumber ?? undefined,
    roomNumber: filters.roomNumber?.toString() || undefined,
    pageIndex: 1,
    pageSize: this.currentFilters.pageSize ?? 10,
  };
  this.fetchRooms();
  };





}
