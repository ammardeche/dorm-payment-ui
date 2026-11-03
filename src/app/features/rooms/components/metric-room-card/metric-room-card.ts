import { Component, computed, input } from '@angular/core';
import { RoomResponseModel } from '../../models/room-response.model';
import { RoomStatsResponse } from '../../models/student-stats-response.model';

@Component({
  selector: 'app-metric-room-card',
  imports: [],
  templateUrl: './metric-room-card.html',
  styleUrl: './metric-room-card.css',
})
export class MetricRoomCard {


  readonly stats = input<RoomStatsResponse | null>(null);

  readonly cards = computed(() => {
    const stats = this.stats();

    return [
      {
        id: 'total',
        label: 'Total rooms',
        value: stats?.total ?? 0,
        description: 'All dormitory rooms',
        color: 'bg-blue-500',
      },
      {
        id: 'available',
        label: 'Available rooms',
        value: stats?.available ?? 0,
        description: 'Rooms with available beds',
        color: 'bg-emerald-500',
      },
      {
        id: 'full',
        label: 'Full rooms',
        value: stats?.full ?? 0,
        description: 'All beds occupied',
        color: 'bg-rose-500',
      },
      {
        id: 'maintenance',
        label: 'Under maintenance',
        value: stats?.maintenance ?? 0,
        description: 'Rooms undergoing maintenance',
        color: 'bg-amber-500',
      },
    ];
  });

}
