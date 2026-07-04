import { Component, input, output, signal } from '@angular/core';
import { StudentFilterModel } from '../../models/student-filter.model';
import { form, FormField } from '@angular/forms/signals';
import { RoomResponseModel } from '../../../rooms/models/room-response.model';

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
  imports: [FormField],
  templateUrl: './filter-component.html',
  styleUrl: './filter-component.css',
})
export class FilterComponent {
  filterRooms = input.required<RoomResponseModel[]>();
  filterChanged = output<StudentFilterModel>();

  filterFormModel = signal<StudentFilterFormModel>({ ...EMPTY_FILTER_FORM });
  studentFilterForm = form(this.filterFormModel);

  search(): void {
    this.filterChanged.emit(this.toDomainModel());
  }

  clear(): void {
    this.filterFormModel.set({ ...EMPTY_FILTER_FORM });
    this.search();
  }

  // The one place that knows how to translate form strings -> real DTO types.
  private toDomainModel(): StudentFilterModel {
    const raw = this.filterFormModel();
    return {
      studentNumber: raw.studentNumber,
      roomId: raw.roomId === '' ? undefined : Number(raw.roomId),
      isActive: raw.isActive === 'all' ? undefined : raw.isActive === 'true',
      pageIndex: 1,
      pageSize: 10,
    };
  }
}
