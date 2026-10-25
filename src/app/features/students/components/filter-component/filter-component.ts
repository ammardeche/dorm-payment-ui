import { Component, effect, input, output, signal, untracked, viewChild } from '@angular/core';
import { StudentFilterModel } from '../../models/student-filter.model';
import { debounce, form, FormField, FormRoot } from '@angular/forms/signals';
import { RoomResponseModel } from '../../../rooms/models/room-response.model';
import { RoomOption } from '../../../rooms/models/room-option-model';
import { RoomSelectComponent } from '../../../rooms/components/room-select-component/room-select-component';

interface StudentFilterFormModel {
  studentNumber: string;
  roomId: string; // '' = "All rooms", otherwise the room id as a string
  isActive: string; // 'all' | 'true' | 'false'
}

const EMPTY_FILTER_FORM: StudentFilterFormModel = {
  studentNumber: '',
  roomId: '',
  isActive: 'all',
};

@Component({
  selector: 'app-filter-component',
  imports: [FormField , FormRoot , RoomSelectComponent],
  templateUrl: './filter-component.html',
  styleUrl: './filter-component.css',
})
export class FilterComponent {
 filterRooms = input.required<RoomOption[]>();
  filterChanged = output<StudentFilterModel>();

  roomSelect = viewChild.required(RoomSelectComponent);

  filterFormModel = signal<StudentFilterFormModel>({ ...EMPTY_FILTER_FORM });
  studentFilterForm = form(this.filterFormModel, (path) => {
    debounce(path.studentNumber, 300);
  });

  // Last emitted filter: stops the first run and duplicate emits.
  private lastKey = JSON.stringify(this.toDomainModel());

  constructor() {
    effect(() => {
      const model = this.toDomainModel();
      const key = JSON.stringify(model);
      if (key === this.lastKey) return;
      this.lastKey = key;
      untracked(() => this.filterChanged.emit(model));
    });
  }

  onRoomSelected(id: number | null): void {
    this.filterFormModel.update((m) => ({ ...m, roomId: id === null ? '' : String(id) }));
  }

  clear(): void {
    this.filterFormModel.set({ ...EMPTY_FILTER_FORM });
    this.roomSelect().clearSelection();
  }

  private toDomainModel(): StudentFilterModel {
    const raw = this.filterFormModel();
    return {
      studentNumber: raw.studentNumber.trim(),
      roomId: raw.roomId === '' ? undefined : Number(raw.roomId),
      isActive: raw.isActive === 'all' ? undefined : raw.isActive === 'true',
      pageIndex: 1,
      pageSize: 10,
    };
  }
}
