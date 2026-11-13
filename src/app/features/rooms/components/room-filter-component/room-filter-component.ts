import { Component, effect, output, signal, untracked } from '@angular/core';
import { RoomQueryModel } from '../../models/room-query-request.model';
import { RoomStatus } from '../../enums/room-status.enum';
import { RoomFilterModel } from '../../models/room-filter-model';
import { form, FormField } from '@angular/forms/signals';
import { RoomSelectComponent } from '../room-select-component/room-select-component';
import { RoomResponseModel } from '../../models/room-response.model';
interface RoomFilterFormModel {
  status: 'all' | RoomStatus;
  floorNumber: number | null;
  roomNumber: number | null;
}

const EMPTY_FILTER: RoomFilterFormModel = {
  status: 'all',
  floorNumber: null,
  roomNumber: null,
};

@Component({
  selector: 'app-room-filter-component',
  imports: [FormField, RoomSelectComponent],
  templateUrl: './room-filter-component.html',
  styleUrl: './room-filter-component.css',
})
export class RoomFilterComponent {

  readonly filterChanged = output<RoomFilterModel>();
  readonly RoomStatus = RoomStatus;
  rooms = signal<RoomResponseModel[]>([]);
  readonly filterFormModel = signal<RoomFilterFormModel>({
    ...EMPTY_FILTER,
  });

  readonly roomFilterForm = form(this.filterFormModel);

  private lastKey = JSON.stringify(this.toDomainModel());

  constructor() {
    effect(() => {
      const filters = this.toDomainModel();

      // Wait until the floor is a valid non-negative integer.
      if (
        filters.floorNumber !== null &&
        (!Number.isInteger(filters.floorNumber) || filters.floorNumber < 0)
      ) {
        return;
      }

      const key = JSON.stringify(filters);

      // Avoid an initial request and duplicate emissions.
      if (key === this.lastKey) return;

      this.lastKey = key;
      untracked(() => this.filterChanged.emit(filters));
    });
  }

  clear(): void {
    this.filterFormModel.set({ ...EMPTY_FILTER });
  }

  private toDomainModel(): RoomFilterModel {
    const raw = this.filterFormModel();
    return {
      status: raw.status === 'all' ? null : raw.status,
      floorNumber: raw.floorNumber,
      roomNumber: raw.roomNumber  ,
    };
  }

  onRoomSelected(id: number | null): void {
    this.filterFormModel.update((m) => ({ ...m, roomId: id === null ? '' : String(id) }));
  }

}
