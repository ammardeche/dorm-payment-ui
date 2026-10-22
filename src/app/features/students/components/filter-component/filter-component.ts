import { Component, effect, input, output, signal } from '@angular/core';
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

  filterFormModel = signal<StudentFilterFormModel>({ ...EMPTY_FILTER_FORM });
  studentFilterForm = form(this.filterFormModel , (path)=> {
    debounce(path.studentNumber, 300);
  });

  constructor() {
    effect(() => {
      const formModel = this.toDomainModel();
      this.filterChanged.emit(formModel);
    });
  }

  // clear(): void {
  //   this.filterFormModel.set({ ...EMPTY_FILTER_FORM });
  //   this.search();
  // }

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
